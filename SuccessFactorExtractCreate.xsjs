  var request;
  var response;
  var client = new $.net.http.Client();
  var destination = $.net.http.readDestination("JHONY_DEP","DestinationSF");

function getCSRF()
{

  try{
    //GET Operation on the base odata URL
    request = new $.web.WebRequest($.net.http.GET,"/");
    //X-CSRF-Token header will be set with value Fetch
    request.headers.set("X-CSRF-Token", "Fetch");
    client.request(request,destination);
    response = client.getResponse();
    //reading the token from response header
    return response.headers.get("X-CSRF-Token").toString();
  }
  catch(errorObj){
  $.response.setBody(JSON.stringify({
  ERROR : errorObj.message
  }));
  return "CSRF TOKEN FETCH FAILED : " + errorObj.message;
  }
}

function makePOSTCall(CSRF){
  //Specifying the entity name for the POST operation
  var request = new $.web.WebRequest($.net.http.POST,"/User");
  
  try{
  //Setting the token header
  request.headers.set("x-csrf-token",CSRF);
  //request.headers.set("x-csrf-token",CSRF);
  //Application content type
  request.headers.set("Content-Type","application/json");
  request.headers.set("X-Requested-With","XMLHttpRequest");
  //setting the data to be created
  var user;
  user = "Leon";
  request.setBody(JSON.stringify(
  { 
"__metadata": {
"uri": "User(userId='"+user+"')"
},

"hr":{
"__metadata": {
"uri": "User(userId='NO_HR')"
}
},

"manager":{
"__metadata": {
"uri": "User(userId='NO_MANAGER')"
}
},

"matrixManager":{
"__metadata": {
"uri": "User(userId='')"
}
},

"status" : "Active",
"username" : user,
"userId" : user,
"email" : "Dummy@noemail.com",
"custom03" : "Gabriel",
"custom01" : "",
"custom02" : "A"


}));
  client.request(request, destination);
  //Checking the status ( 201 for success )
var response =  client.getResponse().status;// === '201' ? "Successfully Created" : "Not created:";
  $.response.setBody(response);
  }
  catch(eee){
  return "Error:"+eee.message;
 
  }

} 
$.response.setBody(makePOSTCall(getCSRF()));
