package com.furEverHome.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class FileStorageService {

	@Autowired
    private Cloudinary cloudinary;
	
	public String storeFile(MultipartFile file, String petCenterId, String docType) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
            "public_id", petCenterId + "_" + docType + "_" + java.util.UUID.randomUUID().toString(),
            "resource_type", "image"
        ));

        return (String) uploadResult.get("secure_url");
    }
	
	
//	private final Path rootLocation = Paths.get("uploads/pet-centers");
//
//	public FileStorageService() {
//		try {
//			Files.createDirectories(rootLocation);
//		} catch (IOException e) {
//			throw new RuntimeException("Could not initialize storage", e);
//		}
//	}
//
//	public String storeFile(MultipartFile file, String petCenterId, String docType) {
//		if (file == null || file.isEmpty()) {
//			return null;
//		}
//
//		try {
//			String fileExtension = getFileExtension(file.getOriginalFilename());
//			String newFileName = petCenterId + "_" + docType + "_" + UUID.randomUUID() + fileExtension;
//			Path destinationFile = this.rootLocation.resolve(newFileName).normalize().toAbsolutePath();
//
//			if (!destinationFile.getParent().startsWith(this.rootLocation.toAbsolutePath())) {
//				throw new RuntimeException("Cannot store file outside current directory");
//			}
//
//			Files.copy(file.getInputStream(), destinationFile);
//			return destinationFile.toString();
//		} catch (IOException e) {
//			throw new RuntimeException("Failed to store file", e);
//		}
//	}
//
//	private String getFileExtension(String fileName) {
//		if (fileName == null || !fileName.contains(".")) {
//			return "";
//		}
//		return fileName.substring(fileName.lastIndexOf("."));
//	}

}
