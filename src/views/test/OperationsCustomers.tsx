export const sortCustomers = (sort, onSortCustomers) => {
    const sortModel: object[] = sortModelFromDataGrid(sort)
    if (sortModel.length > 0) {
        setSortQuery(sort, onSortCustomers)
    } else {
        unsortCustomers(onSortCustomers)
    }
}

const setSortQuery = (sort, onSortCustomers) => {
    onSortCustomers(sortQueryFromGridData(sort))
}

const sortQueryFromGridData = (sort): object => {
    const sortQuery: object = {}
    const sortModels = sortModelFromDataGrid(sort)
    sortModels.forEach(sortModel => {
        const sortColumnFiled: string = sortModel?.field
        const sortValue: string = sortModel?.sort
        sortQuery[sortColumnFiled] = sortValue
    })
    return sortQuery
}

const unsortCustomers = (onSortCustomers) => {
    onSortCustomers({
        "name": "asc"
    })
}

const sortModelFromDataGrid = (sort) => {
    const sortModel = sort?.sortModel
    if (sortModel)
        return sortModel
    return {}
}

//TODO date
// export const customerListDate = (customers) => {
//     const customerListDate = customers.filter((date) => date.createdAt.includes("2021-03-17"))
//     console.log(customerListDate,'customers'); 
//     if (customerListDate?.length > 0) {
//       return customerListDate[0]?.createdAt
//     }
// } 
// console.log(customerListDate, 'customerListDate');

export const pageByTotalAndPageSize = (pageSizeNumber: number, totalCustomers: number): number => {
    const pageNumber: number = Math.floor((totalCustomers / pageSizeNumber) - 1)
    console.log(pageNumber,'pageNumber'); 
    if ((pageNumber) <= 0) {
        return 0
    }
    return pageNumber
}

export const filterDataGrid = (filter, onFilterCustomers, onChangePageCustomers) => {
    const filteredQueryForGraphQl = getQueryFromDataGrid(filter)
    sendFilterQueryToGraphQl(filter, filteredQueryForGraphQl, onFilterCustomers)
    setCurrentPageToOne(onChangePageCustomers)
}

const getQueryFromDataGrid = (filter) => {
    const filteredQueryForGraphQl: object = {}
    const filterModels = filterModelFromDataGrid(filter)

    filterModels.forEach(filterModel => {
        const filterColumnField: string = filterModel.columnField
        const filterOperator: string = filterModel.operatorValue
        const filterValue: string = filterModel.value
        if (filterOperator === 'contains') {
            filteredQueryForGraphQl[filterColumnField] = { _ilike: "%" + filterValue + "%" }
            console.log(filteredQueryForGraphQl, 'filteredQueryForGraphQl');
        } else if (filterOperator === 'endsWith') {
            filteredQueryForGraphQl[filterColumnField] = { _ilike: "%" + filterValue }
            // filterEndsWith(filteredQueryForGraphQl, filterColumnField, filterValue)
        }
        else if (filterOperator === 'startsWith') {
            filteredQueryForGraphQl[filterColumnField] = { _ilike: filterValue + "%" }

        }
        else if (filterOperator === 'equals') {
            filteredQueryForGraphQl[filterColumnField] = { _eq: filterValue }
        }
        //TODO date
        // else if (filterOperator === 'is') {
        //     console.log('isssss'); 
        //     filteredQueryForGraphQl[filterColumnField] = { _eq: customerListDate[0]?.createdAt }
        //     console.log(customerListDate[0],'customerListDate[0]?.createdAt'); 
        // }
        // else if (filterOperator === 'is') {
        //     console.log('isssss'); 
        //     filteredQueryForGraphQl[filterColumnField] = { _eq: "2021-03-17T12:18:08.617102+00:00" }
        //     console.log(customerListDate[0]?.createdAt,'customerListDate[0]?.createdAt'); 
        // }
        // filteredQueryForGraphQl(filterOperator, filterColumnField, filterValue)

        console.log(filteredQueryForGraphQl, 'filteredQueryForGraphQl');
    })

    return filteredQueryForGraphQl
}

const sendFilterQueryToGraphQl = (filter, filteredQueryForGraphQl, onFilterCustomers) => {
    const filteredValue: string = filteredValueFromDataGrid(filter)
    if (filteredValue) {
        setFilteredQueryToGraphQl(filteredQueryForGraphQl, onFilterCustomers)
    } else {
        setDefaultFilteredQueryToGraphQl(onFilterCustomers)
    }
}

const filteredValueFromDataGrid = (filter) => {
    const filterModel = filterModelFromDataGrid(filter)
    for (let i = 0; i < filterModel.length; i++) {
        const filteredValue: string = filterModel[i]?.value
        if (filteredValue)
            return filteredValue
    }
    return ""
}

const filterModelFromDataGrid = (filter) => {
    const filteredModel: object = filter?.filterModel?.items
    if (filteredModel)
        return filter?.filterModel?.items
    return {}
}

const setFilteredQueryToGraphQl = (filteredQueryForGraphQl, onFilterCustomers) => {
    onFilterCustomers(filteredQueryForGraphQl);
}

const setDefaultFilteredQueryToGraphQl = (onFilterCustomers) => {
    onFilterCustomers({
        name: {
            _ilike: "%%"
        }
    })
}

export const setCurrentPageToOne = (onChangePageCustomers) => {
    onChangePageCustomers(0)
}