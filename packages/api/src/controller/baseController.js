const lodash = require('lodash');
class baseController {
  static async get(model) {
    return await model.query().skipUndefined()
  }

  static async post(model, data, transaction) {
    data = removeAdditionalProperties(model, data);
    return await model.query(transaction).insert(data);
  }

  // send back the resource that was just created
  static async postWithResponse(model, data, transaction) {
    return await model.query(transaction).insert(removeAdditionalProperties(model, data)).returning('*');
  }

  static async postRelated(model, subModel, data, transaction){
    if(!Array.isArray(data)){ //if data is not an array
      data = removeAdditionalProperties(subModel, data);
    }

    if(!data.length > 0){
      return await model
        .$relatedQuery(subModel.tableName, transaction)
        .insert(data);
    }
  }


  static async put(model, id, data, transaction=null) {
    // sometime id can be read as a string instead
    // obtain attributes from model
    const resource = removeAdditionalProperties(model, data);
    // put to database
    const table_id = model.idColumn;
    // check if path id matches id provided from body
    return await model.query(transaction).where(table_id, id).update(resource).returning('*');
  }

  static async delete(model, id, transaction=null) {
    // console.log(id);
    const table_id = model.idColumn;
    return await model.query(transaction).where(table_id, id).del()
  }

  static async getIndividual(model, id) {
    const table_id = model.idColumn;
    return await model.query().where(table_id, id)
  }

  static async getByForeignKey(model, field, fieldId){
    const data = await model.query().where(field, fieldId);
    return data;
  }

  static async updateIndividualById(model, id, updatedLog, transaction=null){
    updatedLog = removeAdditionalProperties(model, updatedLog);
    if(!lodash.isEmpty(updatedLog)){
      return await model.query(transaction)
        .patch(updatedLog)
        .where(model.idColumn, id);
    }
  }

}
function removeAdditionalProperties(model, data) {
  if(Array.isArray(data)){
    data.map((obj)=>{
      return lodash.pick(obj, Object.keys(model.jsonSchema.properties));
    });
  }
  return lodash.pick(data, Object.keys(model.jsonSchema.properties));
}


module.exports = baseController;
//export transaction;
