import * as pulumi from "@pulumi/pulumi";
import * as azureFunction from "./azureFunction";
import { countDaysToBirthDay } from "./birthday"

// Create an Azure function that either asks for birthdate or shows number of days until next birtday.
function handler(context: azureFunction.Context, request: azureFunction.HttpRequest) {
    let queries = context.req!.query!;

    let res: azureFunction.HttpResponse = {
        status: azureFunction.HttpStatusCode.OK,
        headers: {
            "content-type": "text/html",
        },
        body:  countDaysToBirthDay(queries),
    };

    context.done(undefined, res);
}

let fn = new azureFunction.HttpFunction("fn", handler);
export let endpoint = fn.endpoint;