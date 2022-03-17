"use strict";

var File = require("dw/io/File");
var Status = require("dw/system/Status");
var ProductLineItem = require("dw/order/ProductLineItem");
var Variant = require("dw/catalog/Variant");
var XMLStreamWriter = require("dw/io/XMLStreamWriter");
var FileWriter = require("dw/io/FileWriter");
var FileReader = require("dw/io/FileReader");
var PriceBookMgr = require("dw/catalog/PriceBookMgr");
var ProductInventoryMgr = require("dw/catalog/ProductInventoryMgr");

// var CSVtoInventoryXML = {

function execute(args) {
  try {
    this.inventoryID = args.inventoryID;
    var csvInvFile = new File("Impex/src/inventoryCSV2/inventoryList2.csv");

    var myfile = FileReader(csvInvFile);
    var fileLines = myfile.readLines();
    var header = fileLines[0].split(" ").join("").split(",");
    var inventoryList = ProductInventoryMgr.getInventoryList(this.inventoryID);
    var XMLInvFile = this.createFile("inventoryList.xml");
    var fileWriter = new FileWriter(XMLInvFile, "UTF-8");
    var xsw = new XMLStreamWriter(fileWriter);

    xsw.writeStartDocument();
    xsw.writeStartElement("inventory");
    xsw.writeAttribute(
      "xmlns",
      "http://www.demandware.com/xml/impex/inventory/2007-05-31"
    );

    xsw.writeStartElement("inventory-list");

    xsw.writeStartElement("header");
    xsw.writeAttribute("list-id", inventoryList.ID);

    xsw.writeStartElement("default-instock");
    xsw.writeCharacters(inventoryList.defaultInStockFlag);
    xsw.writeEndElement();

    xsw.writeStartElement("description");
    xsw.writeCharacters(inventoryList.description);
    xsw.writeEndElement();

    xsw.writeStartElement("use-bundle-inventory-only");
    xsw.writeCharacters("false");
    xsw.writeEndElement();

    xsw.writeStartElement("on-order");
    xsw.writeCharacters("false");
    xsw.writeEndElement();
    xsw.writeEndElement();

    xsw.writeStartElement("records");

    for (let i = 1; i < fileLines.length; i++) {
      var product = fileLines[i].split(" ").join("").split(",");
      xsw.writeStartElement("record");

      xsw.writeAttribute("product-id", product[0]);

      xsw.writeStartElement("allocation");
      xsw.writeCharacters(product[1]);
      xsw.writeEndElement();

      xsw.writeStartElement("allocation-timestamp");
      xsw.writeCharacters(product[2]);
      xsw.writeEndElement();

      xsw.writeEndElement();
    }
    xsw.writeEndElement();
    xsw.writeEndElement();
    xsw.writeEndElement();
    xsw.writeEndDocument();

    xsw.close();
    fileWriter.close();
  } catch (err) {
    var errr = err;
    return new Status(Status.ERROR, "ERROR");
  }

  return new Status(Status.OK, "OK");
}
function createDirectory(dirName) {
  var file = new File(File.IMPEX + "/src/" + dirName);
  var testDir = file.mkdir();
  return dirName;
}

function createFile(fileName) {
  var pathDir = this.createDirectory("InventoryXMLDir");
  var file = new File(File.IMPEX + "/src/" + pathDir + "/" + fileName);

  if (!file.exists()) {
    if (!file.createNewFile()) {
      Logger.error("File " + file.name + " could not be created!");

      return false;
    }
  }

  return file;
}

module.exports = {
  execute: execute,
};
