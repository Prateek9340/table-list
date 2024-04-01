// import { userData } from "./data.js";


const tableHeadElement = document.getElementById("table-head");
const tableBodyElement = document.getElementById("table-body");
const  previousButton = document.getElementById("previous-btn");
const  nextButton = document.getElementById("next-btn");
const  pageNoText = document.getElementById("page-no");



let filteredData=[];
let currentPage=1;
let dataLimit=20;
const URL="https://jsonplaceholder.typicode.com/photos"

    function getPaginatedData(data){
        const startIndex=(currentPage-1)*dataLimit;
        const endIndex=Math.min(dataLimit+startIndex , data.length)
        return data.slice(startIndex, endIndex)
    }



function handleSearchInput(inputKey){
    const searchInputValue=document.getElementById(`${inputKey}-search-input`).value;
    console.log(searchInputValue,`${inputKey}-search-input`)
    const filterData = userData.filter((rowData) =>{
      return String(rowData[inputKey]).toLowerCase().includes(searchInputValue.toLowerCase());
    })
    filteredData =filterData;
    currentPage =1
    pageNoText.innerText=currentPage
    createTableBody(getPaginatedData(filteredData))
}



function createTableHead(tableData) {
    console.log(tableData);
    const tableHeaderKeys = Object.keys(tableData[0])
    
    tableHeaderKeys.forEach((headerKeys) => {
        
        const tableHeaderKeysElement = document.createElement("th")
        tableHeaderKeysElement.innerText = headerKeys;
        tableHeadElement.appendChild(tableHeaderKeysElement)
        const searchInputElement=document.createElement("input")
        const searchInputId=`${headerKeys}-search-input`;
        
        
        searchInputElement.setAttribute('type','search')
        searchInputElement.setAttribute('placeholder' , `search ${headerKeys}` )
        searchInputElement.setAttribute('id',`${headerKeys}-search-input`)
        tableHeaderKeysElement.appendChild( searchInputElement)
        searchInputElement.addEventListener("keyup",() => handleSearchInput(headerKeys))
        
    })
}

function createTableBody(tableData) {
    tableBodyElement.innerHTML=""
    tableData.forEach((rowdata) => {
        const tableRowValues = Object.values(rowdata)
        const tableRowElement = document.createElement("tr")
        
        
        tableRowValues.forEach((descriptionText) => {

            const tableDescriptionElement = document.createElement('td')
            tableDescriptionElement.innerText = descriptionText
            tableRowElement.appendChild(tableDescriptionElement)
            
        })
        
        tableBodyElement.appendChild(tableRowElement)
    })


    
    
}
previousButton.addEventListener("click", () =>{
    const currentData = filteredData.length ? filteredData : userData
   currentPage = currentPage > 1 ? currentPage-1 :1;
    // currentPage=currentPage-1;
    pageNoText.innerText=currentPage
    createTableBody(getPaginatedData(currentData));
    
})

nextButton.addEventListener("click", () =>{
    const currentData = filteredData.length ? filteredData : userData
    const totalPages=Math.ceil( currentData.length/dataLimit)
    currentPage = currentPage < totalPages ? currentPage +1 :totalPages;
    // currentPage=currentPage + 1;
    pageNoText.innerText=currentPage;
    createTableBody(getPaginatedData(currentData));
})


pageNoText.innerText=currentPage;
// createTableHead(userData)
// createTableBody(getPaginatedData(userData))
// console.log(getPaginatedData(userData))

// const fechTableData = async() =>{
//     const response= await fetch(URL)
//     if(!response.ok){
//         throw new Error("failed to fetch  data")
//     }
//     const data= await response.json();
//  return data;

// }
// fechTableData().then((data)=>{
//     createTableHead(data);  
//     createTableBody(getPaginatedData(data))
//     console.log(data)
// }).catch((error) => console.log(error));

fetch(URL)
.then(response => response.json())
.then((data) =>{
  createTableHead(data);  
    createTableBody(getPaginatedData(data))
});