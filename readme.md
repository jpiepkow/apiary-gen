Hapi-swagger to Apiary api Generator.
==
####Requirements:
<hr>

	1. gem install apiaryio // to use apiary cli
	
	2. create a new api on apiary because you need the same.
	
	3. hapi-swagger to generate swagger.json from routes

##Example:

	var swagger2apiary = require('swagger2apiary');
	var gen = new swagger2apiary({token:'TOKEN from apiary',api_name:'NAME OF API',port:'PORT API RUNS ON'}}
	
	gen.generate();
	
###Note: Api must be running in order to gen docs because it pulls from localhost:PORT/swagger.json

###Second Note: Currently not working until apiary fix's an issue with sending JSON swagger documents via the Apiary Command line tool. No timeframe on fix.

	