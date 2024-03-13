use aws_sdk_dynamodb::model::{Put, TransactWriteItem, Update};
use aws_sdk_dynamodb::{model::AttributeValue, Client};
use http::StatusCode;
use lambda_http::{http::Method, run, service_fn, Body, Error, Request, RequestExt, Response};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::collections::HashMap;
use std::time::{SystemTime, UNIX_EPOCH};
use tokio_stream::StreamExt;

const INVENTORY: &str = "/inventory";
const ORDER: &str = "/order";

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct InventoryItem {
    pub item_type: String,
    pub item_name: String,
    pub stock: usize,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Inventory {
    pub items: Vec<InventoryItem>,
}

async fn get_inventory(client: Client) -> (serde_json::Value, StatusCode) {
    let items: Result<Vec<_>, _> = client
        .scan()
        .table_name("mayournaise-inventory")
        .into_paginator()
        .items()
        .send()
        .collect()
        .await;

    // TODO: need to handle error cases instead of just unwrapping
    //       and also if items is an Err()

    let mut inventory = Inventory { items: vec![] };

    if let Ok(item) = items {
        for row in item {
            let inventory_item = InventoryItem {
                item_type: row.get("type").unwrap().as_s().unwrap().to_string(),
                item_name: row.get("name").unwrap().as_s().unwrap().to_string(),
                stock: row.get("stock").unwrap().as_n().unwrap().parse().unwrap(),
            };
            inventory.items.push(inventory_item);
        }
    }
    (json!(inventory), StatusCode::OK)
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Order {
    pub email_address: String,
    pub oil: String,
    pub egg: String,
    pub acid: String,
    pub mustard: String,
}

impl Order {
    /// Make a DynamoDB item for creating an order record
    fn create_order(&self) -> HashMap<String, AttributeValue> {
        let mut map = HashMap::new();
        map.insert(
            "email_address".to_string(),
            AttributeValue::S(self.email_address.clone()),
        );

        let now = SystemTime::now();
        let since_the_epoch = now.duration_since(UNIX_EPOCH).expect("Time went backwards");
        let in_ms =
            since_the_epoch.as_secs() * 1000 + since_the_epoch.subsec_nanos() as u64 / 1_000_000;

        map.insert(
            "timestamp".to_string(),
            AttributeValue::N(in_ms.to_string()),
        );
        map.insert("oil".to_string(), AttributeValue::S(self.oil.clone()));
        map.insert("egg".to_string(), AttributeValue::S(self.egg.clone()));
        map.insert("acid".to_string(), AttributeValue::S(self.acid.clone()));
        map.insert(
            "mustard".to_string(),
            AttributeValue::S(self.mustard.clone()),
        );

        map
    }

    fn update_ingredient(&self, keys: HashMap<String, AttributeValue>) -> Update {
        Update::builder()
            .table_name("mayournaise-inventory")
            .set_key(Some(keys))
            .expression_attribute_names("#stock", "stock")
            .expression_attribute_values(":zeroValue", AttributeValue::N(0.to_string()))
            .condition_expression("#stock > :zeroValue")
            .expression_attribute_values(":value", AttributeValue::N(1.to_string()))
            .update_expression("SET #stock = #stock - :value")
            .build()
    }

    fn update_oil(&self) -> Update {
        let keys = HashMap::from([
            (String::from("type"), AttributeValue::S("oil".to_string())),
            (String::from("name"), AttributeValue::S(self.oil.clone())),
        ]);
        self.update_ingredient(keys)
    }

    fn update_egg(&self) -> Update {
        let keys = HashMap::from([
            (String::from("type"), AttributeValue::S("egg".to_string())),
            (String::from("name"), AttributeValue::S(self.egg.clone())),
        ]);
        self.update_ingredient(keys)
    }

    fn update_acid(&self) -> Update {
        let keys = HashMap::from([
            (String::from("type"), AttributeValue::S("acid".to_string())),
            (String::from("name"), AttributeValue::S(self.acid.clone())),
        ]);
        self.update_ingredient(keys)
    }

    fn update_mustard(&self) -> Update {
        let keys = HashMap::from([
            (
                String::from("type"),
                AttributeValue::S("mustard".to_string()),
            ),
            (
                String::from("name"),
                AttributeValue::S(self.mustard.clone()),
            ),
        ]);

        self.update_ingredient(keys)
    }
}

async fn make_order(client: Client, event: Request) -> (serde_json::Value, StatusCode) {
    println!("{:?}", event);

    let order_request: Order = match event.payload() {
        Ok(Some(order_request)) => order_request,
        Ok(None) => {
            println!("Missing order request in request body");
            return (json!("Bad request"), StatusCode::BAD_REQUEST);
        }
        Err(err) => {
            println!("Failed to parse request body: {}", err);
            return (json!("Bad request"), StatusCode::BAD_REQUEST);
        }
    };

    let transaction_result = client
        .transact_write_items()
        .transact_items(
            TransactWriteItem::builder()
                .put(
                    Put::builder()
                        .table_name("mayournaise-orders")
                        .set_item(Some(order_request.create_order()))
                        .build(),
                )
                .build(),
        )
        .transact_items(
            TransactWriteItem::builder()
                .update(order_request.update_oil())
                .build(),
        )
        .transact_items(
            TransactWriteItem::builder()
                .update(order_request.update_egg())
                .build(),
        )
        .transact_items(
            TransactWriteItem::builder()
                .update(order_request.update_acid())
                .build(),
        )
        .transact_items(
            TransactWriteItem::builder()
                .update(order_request.update_mustard())
                .build(),
        )
        .send()
        .await;

    match transaction_result {
        Ok(_) => (json!(""), StatusCode::CREATED),
        Err(_) => (json!(""), StatusCode::BAD_REQUEST),
    }
}

async fn function_handler(event: Request) -> Result<Response<Body>, Error> {
    let path = event.raw_http_path();
    let method = event.method();
    let shared_config = aws_config::load_from_env().await;
    let client = Client::new(&shared_config);

    // TODO: also return status code to pass through
    let (response_body, status_code) = match *method {
        Method::GET => match path.as_str() {
            INVENTORY => get_inventory(client).await,
            _ => (json!("Not found"), StatusCode::NOT_FOUND),
        },
        Method::POST => match path.as_str() {
            ORDER => make_order(client, event).await,
            _ => (json!("Not found"), StatusCode::NOT_FOUND),
        },
        _ => (json!("Not found"), StatusCode::NOT_FOUND),
    };

    let resp = Response::builder()
        .status(status_code)
        .header("content-type", "application/json")
        .body(response_body.to_string().into())
        .map_err(Box::new)?;
    Ok(resp)
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    env_logger::init();
    run(service_fn(function_handler)).await
}
