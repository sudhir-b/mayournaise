use lambda_http::{http::Method, run, service_fn, Body, Error, Request, RequestExt, Response};
use serde_json::json;

async fn function_handler(event: Request) -> Result<Response<Body>, Error> {
    // Extract some useful information from the request

    let path = event.raw_http_path();
    let method = event.method();

    let response_body = match method {
        &Method::GET => match path {
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
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        // disable printing the name of the module in every log line.
        .with_target(false)
        // disabling time is handy because CloudWatch will add the ingestion time.
        .without_time()
        .init();

    run(service_fn(function_handler)).await
}
