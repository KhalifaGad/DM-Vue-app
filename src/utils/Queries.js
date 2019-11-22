import gql from 'graphql-tag'

/* 
,
        fetchPolicy: 'no-cache'
*/

async function getTotalSales(context) {

    let totalSales = 0
    await context.$apollo.query({
        query: gql ` query{
            admin_totalSales
        }`
    }).then((res) => {
        totalSales = res.data.admin_totalSales
    }).catch(err => console.log(err))

    return totalSales
}

async function getTotalSalesInThisMonth(context) {

    let totalSales = 0
    await context.$apollo.query({
        query: gql ` query{
            admin_totalSalesThisMonth
        }`
    }).then((res) => {
        totalSales = res.data.admin_totalSalesThisMonth
    }).catch(err => console.log(err))

    return totalSales
}

async function getPharmaciesCount(context) {

    let count = 0
    await context.$apollo.query({
        query: gql ` query{
            admin_pharmaciesCount
        }`
    }).then((res) => {
        count = res.data.admin_pharmaciesCount
    }).catch(err => console.log(err))

    return count
}

async function getStoresCount(context) {

    let count = 0
    await context.$apollo.query({
        query: gql ` query{
            admin_storesCount
        }`
    }).then((res) => {
        count = res.data.admin_storesCount
    }).catch(err => console.log(err))

    return count
}

async function getOrdersCount(context) {

    let count = 0
    await context.$apollo.query({
        query: gql ` query{
            admin_ordersCount
        }`
    }).then((res) => {
        count = res.data.admin_ordersCount
    }).catch(err => console.log(err))

    return count
}

async function getPendingOrdersCount(context) {

    let count = 0
    await context.$apollo.query({
        query: gql ` query{
            admin_pendingOrdersCount
        }`
    }).then((res) => {
        count = res.data.admin_pendingOrdersCount
    }).catch(err => console.log(err))

    return count
}

async function getDeliveredOrdersCount(context) {

    let count = 0
    await context.$apollo.query({
        query: gql ` query{
            admin_deliveriedOrdersCount
        }`
    }).then((res) => {
        count = res.data.admin_deliveriedOrdersCount
    }).catch(err => console.log(err))

    return count
}

async function getTopPhramacies(context) {
    let topPharmacies
    await context.$apollo.query({
        query: gql ` query{
            admin_topPharmacies
        }`
    }).then((res) => {
        topPharmacies = res.data.admin_topPharmacies
    }).catch(err => console.log(err))

    return topPharmacies
}

async function getPharmacyNameFromCode(context, code) {
    let pharmacyName = ''
    await context.$apollo.query({
        query: gql ` query{
            pharmacyFromCode(code: "${code}"){
                pharmacyName
            }
        }`
    }).then((res) => {
        pharmacyName = res.data.pharmacyFromCode.pharmacyName
    }).catch(err => console.log(err))

    return pharmacyName
}

async function getTopDrugsSelling(context) {
    let topDrugs
    await context.$apollo.query({
        query: gql ` query{
            admin_topDrugsSellingByValue
        }`
    }).then((res) => {
        topDrugs = res.data.admin_topDrugsSellingByValue
    }).catch(err => console.log(err))

    return topDrugs
}

async function getOrders(context) {
    let orders
    await context.$apollo.query({
        query: gql ` query{
            admin_orders{
                code
                to{
                storeName
                }
                from{
                pharmacyName
                }
                orderStatus
                total
                createdAt
            }
        }`,
        fetchPolicy: 'no-cache'
    }).then((res) => {
        orders = res.data.admin_orders
    }).catch(err => console.log(err))

    return orders
}

async function getOrder(context, code) {
    let order
    await context.$apollo.query({
        query: gql ` query{
            admin_order(code: "${code}"){
                from{
                    city
                    area
                    street
                    phone
                }
                to{
                    city
                    area
                    street
                    phone
                }
                DMFees
                walletDiscount
                orderStatus
                drugsList{
                    drug{
                        name
                    }
                    quantity
                    unitPrice
                    discount
                    total
                }
                total
                createdAt
                acceptingDate
                refusingingDate
                deliveringDate
                refusingNote
                payment
            }
        }`,
        fetchPolicy: 'no-cache'
    }).then((res) => {
        order = res.data.admin_order
    }).catch(err => console.log(err))

    return order
}

export {
    getTotalSales,
    getTotalSalesInThisMonth,
    getPharmaciesCount,
    getStoresCount,
    getOrdersCount,
    getPendingOrdersCount,
    getDeliveredOrdersCount,
    getTopPhramacies,
    getPharmacyNameFromCode,
    getTopDrugsSelling,
    getOrders,
    getOrder
}