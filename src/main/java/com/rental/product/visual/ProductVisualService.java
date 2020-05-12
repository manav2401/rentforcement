package com.rental.product.visual;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

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
		System.out.println("File name entered by user" +  fileName);
			
		try {
			InputStream inputstream = file.getInputStream();
			Files.copy(inputstream, uploadLoaction.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
			System.out.println(uploadLoaction.resolve(fileName));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	public int getLatestFileNumber() {
		return (int) (productVisualRepo.count()+1);
	}
}
