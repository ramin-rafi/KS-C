"use strict";
var File = require("dw/io/File");
var FileWriter = require("dw/io/FileWriter");
var ProductMgr = require("dw/catalog/ProductMgr");
var CSVStreamReader = require("dw/io/CSVStreamReader");
var XMLStreamReader = require("dw/io/XMLStreamReader");
var XMLStreamWriter = require("dw/io/XMLStreamWriter");
var FileReader = require("dw/io/FileReader");
var SeekableIterator = require("dw/util/SeekableIterator");
var PriceBookMgr = require("dw/catalog/PriceBookMgr");
function fileConvertor(args) {
  this.priceBookID = args.priceBookID;
  var File = require("dw/io/File");
  var FileWriter = require("dw/io/FileWriter");
  var ProductMgr = require("dw/catalog/ProductMgr");
  var CSVStreamReader = require("dw/io/CSVStreamReader");
  var XMLStreamReader = require("dw/io/XMLStreamReader");
  var XMLStreamWriter = require("dw/io/XMLStreamWriter");
  var FileReader = require("dw/io/FileReader");
  var SeekableIterator = require("dw/util/SeekableIterator");
  var PriceBookMgr = require("dw/catalog/PriceBookMgr");

  // var xmlFile = new File("impex/src/fileConversionxml/importedPricebook.xml");
  var xmlFile = createFile("importedPricebook.xml");
  // var createFile = xmlFile.createNewFile();
  var csvFile = new File("impex/src/fileConversion/myFile.csv");
  var fileReader = new FileReader(csvFile);

  var fileLines = fileReader.readLines();
  var header = fileLines[0].split(" ").join("").split(",");
  var priceBook = PriceBookMgr.getPriceBook(this.priceBookID);
  var fileWriter = new FileWriter(xmlFile, "UTF-8");
  var xsw = new XMLStreamWriter(fileWriter);
  xsw.writeStartDocument();

  xsw.writeStartElement("pricebooks");
  xsw.writeAttribute(
    "xmlns",
    "http://www.demandware.com/xml/impex/pricebook/2006-10-31"
  );

  xsw.writeStartElement("pricebook");
  xsw.writeStartElement("header");
  xsw.writeAttribute("pricebook-id", this.priceBookID);

  xsw.writeStartElement("currency");
  xsw.writeCharacters(priceBook.currencyCode);
  xsw.writeEndElement();

  xsw.writeStartElement("display-name");
  xsw.writeAttribute("xml:lang", "x-default");
  xsw.writeCharacters(priceBook.displayName);
  xsw.writeEndElement();

  xsw.writeStartElement("online-flag");
  xsw.writeCharacters(priceBook.online);
  xsw.writeEndElement();

  xsw.writeEndElement(); // Header end element
  xsw.writeStartElement("price-tables");
  for (var i = 0; i < fileLines.length; i++) {
    var product = fileLines[i].split(" ").join("").split(",");
    xsw.writeStartElement("price-table");
    xsw.writeAttribute("product-id", product[0]);
    xsw.writeStartElement("amount");
    xsw.writeAttribute("quantity", "1");
    xsw.writeCharacters(product[1]);
    xsw.writeEndElement();
    xsw.writeEndElement();
  }
  xsw.writeEndElement(); // <price-tables> end element
  xsw.writeEndElement(); // pricebook end element
  xsw.writeEndElement(); // pricebooks end element
  xsw.writeEndDocument(); // whole document
  xsw.close();
  fileWriter.close();
}

function createDirectory(dirName) {
  var file = new File(File.IMPEX + "/src/" + dirName);
  var testDir = file.mkdir();
  return dirName;
}

function createFile(fileName) {
  var pathDir = this.createDirectory("fileConversionxml");
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
  fileConvertor: fileConvertor,
};
