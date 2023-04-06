import * as classificationAPI from './classification'
import * as billAPI from './bill'
export default {
	...classificationAPI,
	...billAPI
}
