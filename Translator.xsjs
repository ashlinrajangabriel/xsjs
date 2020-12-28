var data = {
	"targetLanguages": [
    "fr"
  ],
	"sourceLanguage": "en",
	"enableMT": true,
	"enableTranslationQualityEstimation": true,
	"domain": "string",
	"companyMLTRId": "string",
	"units": [
		{
			"textType": "string",
			"key": "string",
			"value": "Love is great",
			"searchData": {
				"language": "string",
				"value": "string"
			}
    }
  ]
};
var jdata = JSON.stringify(data);

var dest = $.net.http.readDestination("translationPackage.xs.xsdestination", "translator");
var client = new $.net.http.Client();

function doPOST() {

	try {

		var req = new $.net.http.Request($.net.http.POST, "translate");

		req.contentType = "application/json";

		req.setBody(jdata);

		client.request(req, dest);
		var response = client.getResponse();

		var res = JSON.stringify(response);

		$.response.contentType = "application/json";

		$.response.status = $.net.http.OK;

		$.response.setBody(JSON.stringify(res));

	} catch (err) {

		$.response.contentType = "text/plain";

		$.response.setBody("Error while executing query: [" + err.message + "]");

		$.response.returnCode = 200;

	}

}

doPOST();
