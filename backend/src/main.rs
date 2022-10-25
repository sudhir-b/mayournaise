use aws_config;
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

    for item in items {
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

impl From<Order> for HashMap<String, AttributeValue> {
    /// Convert Order into a DynamoDB item
    fn from(value: Order) -> HashMap<String, AttributeValue> {
        let mut retval = HashMap::new();
        retval.insert("type".to_owned(), AttributeValue::S("order".to_owned()));

        let now = SystemTime::now();
        let since_the_epoch = now.duration_since(UNIX_EPOCH).expect("Time went backwards");
        let in_ms =
            since_the_epoch.as_secs() * 1000 + since_the_epoch.subsec_nanos() as u64 / 1_000_000;

        retval.insert("name".to_owned(), AttributeValue::S(in_ms.to_string()));
        retval.insert(
            "email_address".to_owned(),
            AttributeValue::S(value.email_address.clone()),
        );
        retval.insert("oil".to_owned(), AttributeValue::S(value.oil.clone()));
        retval.insert("egg".to_owned(), AttributeValue::S(value.egg.clone()));
        retval.insert("acid".to_owned(), AttributeValue::S(value.acid.clone()));
        retval.insert(
            "mustard".to_owned(),
            AttributeValue::S(value.mustard.clone()),
        );

        retval
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

    // TODO: make order
    // TODO: update inventory

    let update_items_table_res = client
        .put_item()
        .table_name("mayournaise-inventory")
        .set_item(Some(order_request.into()))
        .send()
        .await;

    println!("{:?}", update_items_table_res);

    (json!("order made!"), StatusCode::OK)
}

async fn function_handler(event: Request) -> Result<Response<Body>, Error> {
    let path = event.raw_http_path();
    let method = event.method();
    let shared_config = aws_config::load_from_env().await;
    let client = Client::new(&shared_config);

    // TODO: also return status code to pass through
    let (response_body, status_code) = match method {
        &Method::GET => match path.as_str() {
            INVENTORY => get_inventory(client).await,
            _ => (json!("Not found"), StatusCode::NOT_FOUND),
        },
        &Method::POST => match path.as_str() {
            ORDER => make_order(client, event).await,
            _ => (json!("Not found"), StatusCode::NOT_FOUND),
        },
        _ => (json!("Not found"), StatusCode::NOT_FOUND),
    };

    let resp = Response::builder()
        .status(status_code)
        .header("access-control-allow-origin", "*")
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
