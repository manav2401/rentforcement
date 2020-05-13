package com.rental.product.visual;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductVisualService {
	
	@Autowired 
	private ProductVisualRepository productVisualRepo;
	
	
	
	public void fileUpload(MultipartFile file, int productId ) {
		Path uploadLoaction = Paths.get("/home/rushil/Documents/Java/Workspace/Spring-Rentforcement/src/main/resources/static/images");
			
		
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		System.out.println("File name entered by user " +  fileName);
		String newName = Integer.toString(this.getLatestFileNumber());
		
		
		
		//System.out.println("Splitted file names and there size " + names.length + " " + names[1] + " " + names[0]);
		
		System.out.println("Extension: " + this.getFileExtension(fileName));
		newName = newName + "." + this.getFileExtension(fileName);
		String storeName = "images/" + newName; 
		System.out.println("System Generated File Name " + storeName);
			
		try {
			InputStream inputstream = file.getInputStream();
			Files.copy(inputstream, uploadLoaction.resolve(newName), StandardCopyOption.REPLACE_EXISTING);
			System.out.println(uploadLoaction.resolve(newName));
		} catch (IOException e) {
			e.printStackTrace();
			//Throw exception...
		}
		
		productVisualRepo.save(new ProductVisual(productId, storeName));
		
	}
	
	public void filesUpload(ArrayList<MultipartFile> files, int productId ) {
		Path uploadLoaction = Paths.get("/home/rushil/Documents/Java/Workspace/Spring-Rentforcement/src/main/resources/static/images");
		System.out.println("Multiple files uploading service " + files.size());
		for(int i = 0;i<files.size();i++) {
			
			System.out.println(files.get(i).getClass().getName());
			
			String fileName = StringUtils.cleanPath(files.get(i).getOriginalFilename());
			System.out.println("File name entered by user " +  fileName);
			String newName = Integer.toString(this.getLatestFileNumber());
			
			
			
			//System.out.println("Splitted file names and there size " + names.length + " " + names[1] + " " + names[0]);
			
			System.out.println("Extension: " + this.getFileExtension(fileName));
			newName = newName + "." + this.getFileExtension(fileName);
			String storeName = "images/" + newName; 
			System.out.println("System Generated File Name " + storeName);
				
			try {
				InputStream inputstream = files.get(i).getInputStream();
				Files.copy(inputstream, uploadLoaction.resolve(newName), StandardCopyOption.REPLACE_EXISTING);
				System.out.println(uploadLoaction.resolve(newName));
			} catch (IOException e) {
				e.printStackTrace();
				//Throw exception...
			}
			
			productVisualRepo.save(new ProductVisual(productId, storeName));
		}
	}
	
	public String getFileExtension(String fileName) {
        
        if(fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0)
        return fileName.substring(fileName.lastIndexOf(".")+1);
        else return "";
    }
	
	
	public int getLatestFileNumber() {
		return (int) (productVisualRepo.count()+1);
	}
}