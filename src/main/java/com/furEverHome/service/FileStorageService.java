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
}
