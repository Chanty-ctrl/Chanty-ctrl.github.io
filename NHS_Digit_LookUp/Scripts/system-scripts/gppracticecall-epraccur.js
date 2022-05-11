/*********************************************************************** */
/*  https://digital.nhs.uk/services/organisation-data-service/file-downloads/gp-and-gp-practice-related-data?msclkid=45ebdbf9c19411ec938ed684fb4cf581 */
/* https://digital.nhs.uk/services/organisation-data-service/technical-guides/guidance-for-developers/search-endpoint */
/*
/************************************************************************* */

/*
document.onload = () =>{}
*/

var fetchedOrganisation = {};

$(document).ready(() =>{
    $("#apiSearchInfo").removeClass("load_hide");
    $('#searchAnother').hide();

    clearSearchOptions();
});

//$('#btnGpPracticeSearch').bind('click', function(){
//})

//document.querySelector

selectedAPIOption = () => {

    //Clear all search options...
    clearSearchOptions();

    // Better to use JQuery here... Javascript will need a loop instead then search for the checked button...
    let selFetchChoice = $('input[name="fetchChoice"]:checked').val();
    //const selFetchChoice = document.querySelectorAll('input[name="fetchChoice"]');

    //console.log(selFetchChoice);
    switch(selFetchChoice){

        case'PrimaryRole' :
        console.log('Primary Role Selected');
        $("#practiceNameConfirmContainer").empty();
        $("#searchPrimary").show();
        break;

        case'NonPrimaryRole' :
        console.log('Non Primary Role Selected');
        $("#practiceNameConfirmContainer").empty();
        $("#searchNonPrimary").show();
        break;

        case'PracticeName' :
        console.log('Practice Name Selected');
        $("#practiceNameConfirmContainer").empty();
        $("#searchPracticeName").show();
        break;

        case'PracticeCode' :
        console.log('Practice Code Selected');
        $("#practiceNameConfirmContainer").empty();
        $("#searchOrgName").show();
        break;

        default :
        $("#practiceNameConfirmContainer").empty();
        alert('Please choose a selection and try again...');
        break;
    }
}

document.getElementById("btnPrimaryRoleSearch").addEventListener("click", () => {
    $("#practiceNameConfirmContainer").empty();
    fetchViaPrimaryRole();
});

document.getElementById("btnNonPrimarySearch").addEventListener("click", () => {
    let searchNonPrimary = document.getElementById('txtNonPrimarySearch').value;
    $("#practiceNameConfirmContainer").empty();
    fetchViaNonPrimaryRole(searchNonPrimary);
});

document.getElementById("btnPracticeNameSearch").addEventListener("click", () => {
    let searchPracticeName = document.getElementById('txtPracticeNameSearch').value;
    $("#practiceNameConfirmContainer").empty();
    fetchViaPracticeName(searchPracticeName)
});

document.getElementById("btnOrgNameSearch").addEventListener("click", () => {
     let searchOrgCode = document.getElementById('txtOrgNameSearch').value;
     $("#practiceNameConfirmContainer").empty();
    fetchViaPracticeCode(searchOrgCode);
})

document.getElementById("searchAnother").addEventListener('click', () =>{

    $("#fetchDataChoice").show();
    clearSearchOptions();

    $("#practiceNameConfirmContainer").empty();
    $("#jsSelOrganisationDetails").empty();
    $("#selOrganisationDetails").empty();

});

// Primary Role (RO177) ...
fetchViaPrimaryRole = () => {
   fetch('https://directory.spineservices.nhs.uk/ORD/2-0-0/organisations?PrimaryRoleId=RO177')
   .then(result => result.json())
   .then(response => {

    if(response.Organisations.length > 1) {
     $("#pnlConfirmSearch").show();
     $("#lblConfirmMultiple").text("There are a total of " + response.Organisations.length + " practices found, please confirm a practice");
    }

    for(var i = 0; i < response.Organisations.length; i++) {
      console.log(response.Organisations[i]);
      createConfirmPanel(response.Organisations[i], i + 1);
    }
       console.log(response);
   })
   .catch(console.error);
}

// Non-Primary Role ...
fetchViaNonPrimaryRole = (nonPriRoleID) => {
        //(RO72;RO76;RO80; RO82;RO87;RO246; RO247;RO248;RO249; RO250;RO251;RO252; RO253;RO254;RO255; RO259;RO260)...
        fetch('https://directory.spineservices.nhs.uk/ORD/2-0-0/organisations?NonPrimaryRoleId=' + nonPriRoleID)
        .then(result => result.json())
        .then(response => {

         console.log(response)
        if(response.Organisations.length > 1) {
            $("#pnlConfirmSearch").show();
            $("#lblConfirmMultiple").text("There are a total of " + response.Organisations.length + " practices found, please confirm a practice");
           }

           for(var i = 0; i < response.Organisations.length; i++) {
             console.log(response.Organisations[i]);
             createConfirmPanel(response.Organisations[i], i + 1);
           }
              console.log(response);
          })
          .catch(console.error);
       }

// GP Practice Name Search ...
fetchViaPracticeName = (practiceName) => {
    fetch(' https://directory.spineservices.nhs.uk/ORD/2-0-0/organisations?Name=' + practiceName)
    .then(result => result.json())
    .then(response => {

        //console.log(response);
        // console.log(response.Organisations[0]);

        if(response.Organisations.length > 1) {
            //document.getElementById('pnlConfirmSearch').style.visibility = "visible";
            $("#pnlConfirmSearch").show();

            let multipleText = "Please confirm a practice, there are a total of " + response.Organisations.length + " practices found. ";
            $("#lblConfirmMultiple").text(multipleText); //(`${multipleText}`);
        }

        for(var i = 0; i < response.Organisations.length; i++) {
            console.log(response.Organisations[i]);
           // document.getElementById("lblConfirmPracticeName").innerText = response.Organisations[i].Name;
            createConfirmPanel(response.Organisations[i], i + 1);
        }
    })
    .catch(console.error);
}

// GP Practice code search ...
fetchViaPracticeCode = (orgCode) =>{
        fetch('https://directory.spineservices.nhs.uk/ORD/2-0-0/organisations/' + orgCode) //A81023')
        .then(result => result.json())
        .then(response => {

          console.log(response);
            /* if(response.Organisations.length > 1) {
                $("#pnlConfirmSearch").show();

                let multipleText = "Please confirm a practice, there are a total of " + response.Organisations.length + " practices found. ";
                $("#lblConfirmMultiple").text(multipleText); //(`${multipleText}`);
            }*/

            createConfirmPanel(response.Organisation, 1);
           /*   for(var i = 0; i < response.Organisation.length; i++) {
                console.log(response.Organisation[i]);
                createConfirmPanel(response.Organisation[i], i + 1);
            }*/
        })
        .catch(console.error);
}

// Confirmed GP Practice Name Search ...
fetchConfirmedOrg = (confiredOrg) => {

    fetch(confiredOrg)
    .then(result => result.json())
    .then(response => {
        console.log(response);

       // showPracticeViaName(response.Organisations[i], i + 1);
       $('#lblConfirmMultiple').text('');
       $('#fetchDataChoice').hide();
       $('#apiSearchInfo').hide();
       $("#practiceNameConfirmContainer").hide();

       $('#searchAnother').show();

       let statusCell = response.Organisation.Status
       let bgStatus = (statusCell == "Active") ? "bg-success" : "bg-danger";

       $('#selOrganisationDetails').append(

        '<div class="text-center mb-1">' +
        '<span class="display-4 mb-3">' + response.Organisation.Name + '</span>' +
        '</div><hr/>' +
        '<table class="w-75 centered mb-lg-3 table table-bordered rounded mb-2">' +
        '<th class="table-info" colspan="2"></th>' +
        '<tbody>' +
        '<tr>' +
        '<td>Status</td>' +
        '<td class="'+ bgStatus +'">'+ response.Organisation.Status +'</td>' +
        '</tr>' +
            '<tr>' +
            '<td>Organisation Code</td>' +
            '<td>' + response.Organisation.OrgId.extension + '</td>' +
        '</tr>' +
        '<tr>' +
            '<td>Location</td>' +
            '<td>'+ response.Organisation.GeoLoc.Location.AddrLn1 + '<br />' +
                    response.Organisation.GeoLoc.Location.AddrLn2 + '<br />' +
                    response.Organisation.GeoLoc.Location.Town + '<hr />' +
                    response.Organisation.GeoLoc.Location.County  +
            '</td>' +
         '</tr>' +
         '<tr>' +
         '<td>Postcode</td>' +
         '<td>' + response.Organisation.GeoLoc.Location.PostCode + '</td>' +
         '</tr>' +
        '</tbody></table>'
       );

      // showPracticeViaName();
    })
    .catch(console.error);
}

/* Add objects and constuctor
const objPracticeName = {
    practiceName: response.Name
}
*/

//createConfirmPanel = (response, orgCount) => {
    createConfirmPanel = (response, orgCount) => {
    try {

    let practiceName = response.Name;
    let orgStats = response.Status;
    let pLink = response.OrgLink;
    //let viaCode
    let orgCode;
    if (typeof response.OrgId == 'object'){
        orgCode= response.OrgId.extension;
    }else{
        orgCode= response.OrgId;
    }

    let newButtonID = "btnConfirmPName_Yes_" + orgCode;

   $('#practiceNameConfirmContainer').append(
    ' <label class="form-inline numberedPractices lead p-2 border shadow-sm">'+ orgCount +'</label>' +
    '<div class="card w-75 centered mb-lg-3">' +
    '<h5 class="card-header">' + practiceName + '</h5>' +
    '<div class="card-body">' +
    '<h5 class="card-title">Practice Status :: '+ orgStats +'</h5>' +
    '<table class="table table-bordered mb-2">' +
    '<tbody><tr>' +
        '<td>Practice Name</td>' +
        '<td>'+ practiceName +'</td>' +
     '</tr>' +
     '<tr>' +
         '<td>Organisation Code</td>' +
         '<td>' + orgCode + '</td>' +
     '</tr>' +
 '</tbody></table>' +
 '<div class="mb-4 bg-light">' +
 '<input id="' + newButtonID + '"  role="button" class="btn btn-success btn-sm float-right ml-1" value="Confirm">' +
'</div>' +
' </div>'+
' </div>');

//console.log("org link " + pLink);

 // Add button and click event to each org found ...
 document.getElementById(newButtonID).addEventListener('click', () => {
    //alert("you have selected button ID :: " + newButtonID + ' : ' + pLink);
    fetchConfirmedOrg(pLink);
  });


  } catch (error) {
 }
}

showPracticeViaName = (response) => {

    //try {

            let tblContainer = document.getElementById('jsSelOrganisationDetails');
            let tbl = document.createElement('table');

            //tbl.classList.add('w-75 centered mb-lg-3 table table-bordered rounded mb-2');
            tbl.classList.add("w-75", "centered", "mb-lg-3", "table", "table-bordered", "rounded", "mb-2");

            for (var i = 0; i < 3; i++) {
                var tr = tbl.insertRow();
                for (var j = 0; j < 2; j++) {
                    if (i == 2 && j == 3) {
                        break;
                    } else {
                        var td = tr.insertCell();
                        td.appendChild(document.createTextNode('Cell'));
                        //td.style.border = '1px solid black';
                        if (i == 1 && j == 1) {
                            td.setAttribute('rowSpan', '2');
                        }
                    }
                }
            }
            tblContainer.appendChild(tbl);

    //} catch (error) {

    //}
}

clearSearchOptions = () => {
    $("#searchPrimary").hide();
    $("#searchNonPrimary").hide();
    $("#searchPracticeName").hide();
    $("#searchOrgName").hide();

    $("#pnlConfirmSearch").hide();
    //document.getElementById('pnlConfirmSearch').style.visibility = "hidden";
}

