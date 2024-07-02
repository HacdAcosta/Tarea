const { QueryTypes } = require("sequelize");
const db = require("../models/")
const sequelize = db.sequelize;
const CashRegisters = db.dbo_pos_cash_registers;
const CashRegistersCategories = db.dbo_pos_cash_register_categories;

async function getCategories({ product_id, onlyIds, mySQLtransaction}){
  try {
		if(!product_id) 
			throw "No se ha enviado la identificación del producto";

		const productCategoriesQuery = `
			SELECT
				dsc.id AS category_id
			FROM
				dbo_storage_product_subcategories dsps
				LEFT JOIN dbo_storage_subcategories dss ON dss.id = dsps.subcategory_id
				LEFT JOIN dbo_storage_categories dsc ON dsc.id = dss.category_id
			WHERE dsps.product_id = :product_id
			GROUP BY category_id;
		`;

		const productCategories = await sequelize.query( productCategoriesQuery, {
			transaction: mySQLtransaction ? mySQLtransaction : null,
			type: QueryTypes.SELECT,
			replacements: {
				product_id
			}
		}).catch( error => {
			console.error(error);
			throw "Error al consultar categorías del producto"
		})
		
		if(onlyIds){
			const productCategoriesIds = productCategories.map( category => category.category_id );
			return productCategoriesIds
		}
		return productCategories;

	} catch (error) {
		
	}
}

module.exports = {
	getCategories
}