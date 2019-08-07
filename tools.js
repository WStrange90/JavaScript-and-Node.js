var moment = require('moment');

module.exports = {
	//pass in a date and its format to get the first and last days of the month in the same format
    singleMonthDateRange: function (month, dateFormat) { //month and dateFormat are strings
        var startDate = moment(month, dateFormat).startOf("month").format(dateFormat)
        var endDate = moment(month, dateFormat).endOf("month").format(dateFormat)
        return {
            startDate: startDate,
            endDate: endDate
        };
    },
	
	//pass in an object and have strings trimmed and numbers casted as such
	//usefull to pretty up output from an sql query as you loop through the results
	normaliseObject: function (object) {
        var trimmed;
        for (key in object) {
            if (object[key] !== null) {
                if (typeof object[key] === "string") {
                    trimmed = object[key].trim();
                    if (this.isNumeric(trimmed) && trimmed != "") { 
                        if (trimmed != "") 
                            object[key] = Number(trimmed);
                    } else {
                        object[key] = trimmed;
                    }
                }
            }
        }
    },

    isNumeric: function (value) {
        return !isNaN(value)
    },

	//use to set the properties of an entire Excel spreadsheet row
    getRow: function (worksheet, index) {
        return worksheet.getRow(index);
    },
	
	//Use to return or set the value of an Excel cell
	getCell: function (worksheet, address) {
        return worksheet.getCell(address).value;
    },

	//Use to write to an Excel spreadsheet cell, with options for formatting
    setCell: function (worksheet, address, value, numberFormat, border) {
        if (value !== undefined)
            worksheet.getCell(address).value = value;

        if (numberFormat !== undefined)
            worksheet.getCell(address).numFmt = numberFormat;

        if (border !== undefined) {
            switch (border) {
                case 'mediumBorder':
                    worksheet.getCell(address).border = {
                        top: {
                            style: 'medium',
                            color: {
                                argb: '00000000'
                            }
                        },
                        left: {
                            style: 'medium',
                            color: {
                                argb: '00000000'
                            }
                        },
                        bottom: {
                            style: 'medium',
                            color: {
                                argb: '00000000'
                            }
                        },
                        right: {
                            style: 'medium',
                            color: {
                                argb: '00000000'
                            }
                        }
                    }
                    break;

                case 'thinBorder':
                    worksheet.getCell(address).border = {
                        top: {
                            style: 'thin',
                            color: {
                                argb: '00000000'
                            }
                        },
                        left: {
                            style: 'thin',
                            color: {
                                argb: '00000000'
                            }
                        },
                        bottom: {
                            style: 'thin',
                            color: {
                                argb: '00000000'
                            }
                        },
                        right: {
                            style: 'thin',
                            color: {
                                argb: '00000000'
                            }
                        }
                    }
                    break;

                case 'boldFont':
                    worksheet.getCell(address).font = {
                        bold: true
                    }
                    break;

                case 'boldUnderline':
                    worksheet.getCell(address).font = {
                        bold: true,
                        underline: true
                    }
                    break;

                case 'boldAndBorder':
                    worksheet.getCell(address).font = {
                            bold: true
                        },
                        worksheet.getCell(address).border = {
                            top: {
                                style: 'thin',
                                color: {
                                    argb: '00000000'
                                }
                            },
                            left: {
                                style: 'thin',
                                color: {
                                    argb: '00000000'
                                }
                            },
                            bottom: {
                                style: 'thin',
                                color: {
                                    argb: '00000000'
                                }
                            },
                            right: {
                                style: 'thin',
                                color: {
                                    argb: '00000000'
                                }
                            }
                        }
						break;
            }
        }
    },

	//Use to set page margins and force worksheet to print on single page
    fitSheetOnOnePage: function (worksheet) {
        worksheet.pageSetup.fitToPage = true;
        worksheet.pageSetup.fitToWidth = 1;
        worksheet.pageSetup.fitToHeight = 1;
        worksheet.pageSetup.margins = {
            left: 0.25,
            right: 0.25,
            top: 0.25,
            bottom: 0.25,
            header: 0.3,
            footer: 0.3
        };
    },
	
	//Use to set page margins and force worksheet to print with all columns on a page
    fitAllColumnsOnOnePage: function (worksheet) {
        worksheet.pageSetup.fitToPage = true;
        worksheet.pageSetup.fitToWidth = 1;
        worksheet.pageSetup.fitToHeight = 0;
        worksheet.pageSetup.margins = {
            left: 0.25,
            right: 0.25,
            top: 0.25,
            bottom: 0.25,
            header: 0.3,
            footer: 0.3
        };
    }

};