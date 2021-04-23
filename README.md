## HTML / JSON Content Negotiation in NestJS

This is an example of how you can dynamically render the output of a controller as a HTML view or raw JSON depending on the HTTP `Accept` header.

It was adapted from the [Content Negotation example by jmcdo29](https://github.com/jmcdo29/nest-content-negotiation) found in [this issue](https://github.com/nestjs/nest/issues/4704).

Start the application with `npm start` and then either:

1. View `http://localhost:3000/cats` in your browser - this will show a HTML view of the list of cats (as list items)
2. Make a curl request to `http://localhost:3000/cats` - you will get the list of cats as a JSON response.

It is put together from two pieces.

1. The `ViewAs` decorator (`view-as.decorator.ts`) - which behaves almost identical to the `@Render` decorator provided by next except it only takes note of the template, rather than always render it.
2. The `ContentInterceptor` which determines how to send the response based on the `Accept` header.
