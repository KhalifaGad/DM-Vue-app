import gql from "graphql-tag";

async function orderAction(context, code, status) {
    let order = await context.$apollo.mutate({
        mutation: gql `mutation ($code: String!, $status: OrderStatus!){
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

async function add2BlackList(context, id) {
    let isAdded
    await context.$apollo.mutate({
            mutation: gql `mutation {
                    admin_add2BlackList(pharmacyId: "${id}")
                }`
        }).then(res => isAdded = res.data.admin_add2BlackList)
        .catch(err => console.log(err))

    return isAdded
}

async function removeFromBlackList(context, id) {
    let isRemoved
    await context.$apollo.mutate({
            mutation: gql `mutation {
                    admin_removeFromBlackList(pharmacyId: "${id}")
                }`
        }).then(res => isRemoved = res.data.admin_removeFromBlackList)
        .catch(err => console.log(err))

    return isRemoved
}

async function sendNotification2Pharmacy(context, id, title, body) {
    let isSent
    await context.$apollo.mutate({
            mutation: gql `mutation {
                    admin_sendNtfc2Pharmacy(id: "${id}",
                        title: "${title}", body: "${body}")
                }`
        }).then(res => {
            /* console.log(res) */
            isSent = res.data.admin_sendNtfc2Pharmacy
        })
        .catch(err => console.log(err))

    return isSent
}

async function addDiscount2Pharmacy(context, id, ratio) {
    let isAdded
    await context.$apollo.mutate({
            mutation: gql `mutation {
                    admin_addDiscount2Pharmacy(id: "${id}",
                        ratio: ${ratio})
                }`
        }).then(res => isAdded = res.data.admin_addDiscount2Pharmacy)
        .catch(err => console.log(err))

    return isAdded
}

async function updateDrugName(context, oldName, newName) {
    let isUpdated
    await context.$apollo.mutate({
            mutation: gql `mutation {
                    admin_updateDrugName(
                        oldName: "${oldName}",
                        newName: "${newName}"
                    )
                }`
        }).then(res => isUpdated = res.data.admin_updateDrugName)
        .catch(err => console.log(err))

    return isUpdated
}

async function addDrug(context, name) {
    let drugId
    await context.$apollo.mutate({
            mutation: gql `mutation {
                    addDrug(
                        name: "${name}"
                    )
                }`
        }).then(res => drugId = res.data.addDrug)
        .catch(err => console.log(err))

    return drugId ? true : false
}

async function sendNotificationByArea(context, area, title, body) {
    let isSent
    await context.$apollo.mutate({
            mutation: gql `mutation {
                    admin_sendNotificationByArea(
                        area: "${area}",
                        title: "${title}",
                        body: "${body}",
                    )
                }`
        }).then(res => isSent = res.data.admin_sendNotificationByArea)
        .catch(err => console.log(err))

    return isSent
}

export {
    orderAction,
    add2BlackList,
    removeFromBlackList,
    sendNotification2Pharmacy,
    addDiscount2Pharmacy,
    updateDrugName,
    addDrug,
    sendNotificationByArea
}