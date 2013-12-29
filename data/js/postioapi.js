/* Copyright (c) 2012-2013 The TagSpaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that 
 * can be found in the LICENSE file. */
define(function(require, exports, module) {
"use strict";
    
    // Activating browser specific exports modul
    console.log("Loading postioapi.js ...");

    var TSCORE = require("tscore");
    
    exports.createDirectoryIndex = function(directoryIndex) {
        TSCORE.PerspectiveManager.updateFileBrowserData(directoryIndex);
        TSCORE.hideLoadingAnimation();        
    };   
    
    exports.createDirectoryTree = function(directoyTree) {
        TSCORE.PerspectiveManager.updateTreeData(directoyTree);
        TSCORE.hideLoadingAnimation();         
    };    
    
    exports.createDirectory = function() {
        //TODO refresh the directory area
        TSCORE.hideLoadingAnimation();        
    };

    exports.renameFile = function(oldFilePath, newFilePath) {
        var lastOpenedFile = TSCORE.FileOpener.getOpenedFilePath();        

        console.log("Last opened Filename: "+lastOpenedFile);
        
        // TODO handle case in which a file opened for editing and a tag has been added / file renamed
        if(TSCORE.FileOpener.isFileOpened() && (oldFilePath == lastOpenedFile) ) {
            TSCORE.FileOpener.openFile(newFilePath);                    
        }

        var oldFileContainingPath = TSCORE.TagUtils.extractContainingDirectoryPath(oldFilePath),
            newFileConaintingPath = TSCORE.TagUtils.extractContainingDirectoryPath(newFilePath);
        if(oldFileContainingPath != newFileConaintingPath) {
            // File was moved
            //TSCORE.removeFileModel(TSCORE.fileList, filePath);
            // TODO consider case - file was moved in subdir shown in the recursive search results
            TSCORE.PerspectiveManager.removeFileUI(oldFilePath);            
            TSCORE.updateFileModel(TSCORE.fileList, oldFilePath, newFilePath);
        } else {
            // File was just renamed
            TSCORE.updateFileModel(TSCORE.fileList, oldFilePath, newFilePath);
            TSCORE.PerspectiveManager.updateFileUI(oldFilePath, newFilePath);            
        } 
        TSCORE.hideLoadingAnimation();        
    };
        
    exports.loadTextFile = function(content) {
        TSCORE.FileOpener.updateEditorContent(content);
        TSCORE.hideLoadingAnimation();
    };
    
    exports.saveTextFile = function(filePath) {
        TSCORE.PerspectiveManager.refreshFileListContainer();
        //if(!TSCORE.FileOpener.isFileOpened()) {
            TSCORE.FileOpener.openFile(filePath);                    
        //}
        TSCORE.hideLoadingAnimation();                             
    };
    
    exports.listDirectory = function(anotatedDirList) {
        TSCORE.PerspectiveManager.updateFileBrowserData(anotatedDirList);
        TSCORE.updateSubDirs(anotatedDirList);
        TSCORE.hideLoadingAnimation();        
    };

    exports.errorOpeningPath = function() {
        TSCORE.showAlertDialog("Error occured while opening a path! Currently opened location will be closed."); 
        TSCORE.closeCurrentLocation();
        TSCORE.PerspectiveManager.updateFileBrowserData([]);        
    };
    
    exports.deleteElement = function(filePath) {
        TSCORE.removeFileModel(TSCORE.fileList, filePath);
        TSCORE.PerspectiveManager.removeFileUI(filePath);
        TSCORE.closeFileViewer();
        TSCORE.hideLoadingAnimation();        
    };
    
    exports.checkNewVersion = function(data) {
        TSCORE.updateNewVersionData(data);    
    };  

    exports.selectDirectory = function(dirPath) {
        // TODO make the use of this function more general
        var dirName = TSCORE.TagUtils.extractContainingDirectoryName(dirPath+TSCORE.TagUtils.DIR_SEPARATOR);
        $("#connectionName").val(dirName);                
        $("#folderLocation").val(dirPath);
        //$("#connectionName2").val(dirName);                
        $("#folderLocation2").val(dirPath);        
    };
    
    exports.openDirectory = function(dirPath) {

    };

    exports.selectFile = function() {
        console.log("File selected: "+$(this).val());
    };
    
    exports.openExtensionsDirectory = function() {
    
    };
});