# Analytics SDK Integration Guide

This guide demonstrates how to integrate our analytics SDK into your web application.

## Quick Start

Add the following script tag to your HTML file, just before the closing `</body>` tag:

```html
<script type="module" src="https://analytics_arlink.ar.io/browser.js" 
        data-process-id="YOUR_PROCESS_ID" 
        data-track-url-hashes="true" 
        data-debug="true"></script>
```

## Configuration Options

The SDK supports the following configuration attributes:

- `data-process-id`: Your unique process ID (required)
- `data-track-url-hashes`: Set to "true" to track URL hash changes (optional)
- `data-debug`: Set to "true" to enable debug logging in console (optional)

## Example Implementation

Here's a complete example of how to implement the SDK in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Website</title>
</head>
<body>
    <!-- Your website content here -->

    <!-- Analytics SDK Implementation -->
    <script type="module" src="https://analytics_arlink.ar.io/browser.js" 
            data-process-id="YOUR_PROCESS_ID" 
            data-track-url-hashes="true" 
            data-debug="true"></script>
</body>
</html>
```

## Best Practices

1. Always place the script tag just before the closing `</body>` tag for optimal page loading
2. Replace `YOUR_PROCESS_ID` with your actual process ID spawned in Arlink
3. Enable debug mode during development and disable it in production

