use aws_config;
use aws_sdk_dynamodb::Client;
use lambda_http::{http::Method, run, service_fn, Body, Error, Request, RequestExt, Response};
use serde::{Deserialize, Serialize};
use serde_json::json;
use tokio_stream::StreamExt;

const INVENTORY: &str = "/inventory";

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

async fn get_inventory(client: Client) -> serde_json::Value {
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
    json!(inventory)
}

async fn function_handler(event: Request) -> Result<Response<Body>, Error> {
    // Extract some useful information from the request

    println!("PLEASE");

    let path = event.raw_http_path();
    let method = event.method();
    let shared_config = aws_config::load_from_env().await;
    let client = Client::new(&shared_config);

    // TODO: also return status code to pass through
    let response_body = match method {
        &Method::GET => match path.as_str() {
            INVENTORY => get_inventory(client).await,
            _ => json!(format!("GET request: {path}")),
        },
        &Method::POST => match path {
            _ => json!(format!("POST request: {path}")),
        },
        _ => json!("Unsupported HTTP method"),
    };

    let resp = Response::builder()
        .status(200)
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
