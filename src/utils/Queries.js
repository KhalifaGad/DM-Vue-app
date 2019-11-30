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
        }`,
        fetchPolicy: 'no-cache'
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
        }`,
        fetchPolicy: 'no-cache'
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
                    pharmacyName
                }
                to{
                    city
                    area
                    street
                    phone
                    storeName
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

async function getPharmacies(context) {
    let pharmacies
    await context.$apollo.query({
        query: gql `query{
            admin_pharmacies{
                pharmacyName
                id
                code
            }
        }`
    }).then((res) => {
        pharmacies = res.data.admin_pharmacies
    }).catch(err => console.log(err))

    return pharmacies
}
async function getStores(context) {
    let stores
    await context.$apollo.query({
        query: gql `query{
            admin_stores{
                storeName
                id
            }
        }`
    }).then((res) => {
        stores = res.data.admin_stores
    }).catch(err => console.log(err))

    return stores
}

async function getPharmacy(context, id) {
    let pharmacy
    await context.$apollo.query({
        query: gql `query{
            admin_pharmacy(id: "${id}"){
                city
                area
                street
                phone
                code
                email
            }
        }`
    }).then((res) => {
        pharmacy = res.data.admin_pharmacy
    }).catch(err => console.log(err))

    return pharmacy
}

async function getStore(context, id) {
    let store
    await context.$apollo.query({
        query: gql `query{
            admin_store(id: "${id}"){
                city
                area
                street
                phone
                email
            }
        }`
    }).then((res) => {
        store = res.data.admin_store
    }).catch(err => console.log(err))

    return store
}

async function getStoreOrders(context, id) {
    let storeOrders
    await context.$apollo.query({
        query: gql `query{
            admin_storeOrders(id: "${id}"){
                code
                from{
                pharmacyName
                }
                orderStatus
                total
                createdAt
            }
        }`
    }).then((res) => {
        storeOrders = res.data.admin_storeOrders
    }).catch(err => console.log(err))

    return storeOrders
}

async function getPharmacyOrders(context, id) {
    let pharmacyOrders
    await context.$apollo.query({
        query: gql `query{
            admin_pharmacyOrders(id: "${id}"){
                code
                to{
                storeName
                }
                orderStatus
                total
                createdAt
            }
        }`
    }).then((res) => {
        pharmacyOrders = res.data.admin_pharmacyOrders
    }).catch(err => console.log(err))

    return pharmacyOrders
}

async function checkIsBlackListed(context, id) {
    let isBlackListed
    await context.$apollo.query({
        query: gql `query{
            admin_isBlackListed(pharmacyId: "${id}")
        }`,
        fetchPolicy: 'no-cache'
    }).then((res) => {
        isBlackListed = res.data.admin_isBlackListed
    }).catch(err => console.log(err))

    return isBlackListed
}

async function getDrugSellingValue(context, id) {
    let sellingVal
    await context.$apollo.query({
        query: gql `query{
            admin_getDrugSellingValue(id: "${id}")
        }`
    }).then((res) => {
        sellingVal = res.data.admin_getDrugSellingValue
    }).catch(err => console.log(err))

    return sellingVal
}

async function getDrugsWtihSellingValue(context) {
    let drugs
    await context.$apollo.query({
        query: gql `query{
            admin_getDrugsWtihSellingValue
        }`
    }).then((res) => {
        drugs = res.data.admin_getDrugsWtihSellingValue
    }).catch(err => console.log(err))

    return drugs
}


async function getDrugs(context) {
    let drugs
    await context.$apollo.query({
            query: gql `query{
            drugs(onlyCash: true){
                name
                id
            }
        }`
        }).then(res => drugs = res.data.drugs)
        .catch(err => console.log(err))

    return drugs
}

async function getDrugsName(context) {
    let drugs
    await context.$apollo.query({
            query: gql `query{
            drugs(onlyCash: true){
                name
            }
        }`,
            fetchPolicy: 'no-cache'
        }).then(res => drugs = res.data.drugs)
        .catch(err => console.log(err))

    return drugs
}

async function getDrugStores(context, id) {
    let stores
    await context.$apollo.query({
            query: gql `query{
            admin_drug(id: "${id}"){
                stores{
                    store  
                    price
                    discount
                    deferredDiscount
                    onlyCash
                }
            }
        }`
        }).then(res => {
            stores = res.data.admin_drug.stores
        })
        .catch(err => console.log(err))

    return stores
}

async function getStoreName(context, id) {
    let storeName
    await context.$apollo.query({
        query: gql `query{
            admin_store(id: "${id}"){
                storeName
            }
        }`
    }).then((res) => {
        storeName = res.data.admin_store.storeName
    }).catch(err => console.log(err))

    return storeName
}

async function getPharmaciesAreas(context) {
    let areas
    await context.$apollo.query({
            query: gql `query{
            admin_pharmaciesArea
        }`
        }).then((res) => areas = res.data.admin_pharmaciesArea)
        .catch(err => console.log(err))

        return areas
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
    getOrder,
    getStores,
    getPharmacies,
    getPharmacy,
    getStore,
    getStoreOrders,
    getPharmacyOrders,
    checkIsBlackListed,
    getDrugSellingValue,
    getDrugs,
    getDrugsWtihSellingValue,
    getDrugStores,
    getStoreName,
    getDrugsName,
    getPharmaciesAreas
}