import gql from "graphql-tag";

async function orderAction(context, code, status){
    let order = await context.$apollo.mutate({
        mutation: gql`mutation ($code: String!, $status: OrderStatus!){
            admin_orderAction(code: $code, status: $status){
                id
            }
        }`,
        variables: {
            code,
            status
        }
    }).catch(err => console.log(err))

    return order
}

export { orderAction }