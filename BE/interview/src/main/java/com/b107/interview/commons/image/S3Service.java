package com.b107.interview.commons.image;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.b107.interview.commons.image.dto.ImageUrl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3 amazonS3;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadFile(MultipartFile file) throws IOException {

        String fileName = generateUniqueFileName(file.getOriginalFilename());

        //파일 형식 구하기
        String ext = fileName.split("\\.")[1];
        String contentType = "";

        //content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.
        switch (ext) {
            case "jpg":
            case "jpeg":
                contentType = "image/jpeg";
                break;
            case "png":
                contentType = "image/png";
                break;
            case "txt":
                contentType = "text/plain";
                break;
            case "csv":
                contentType = "text/csv";
                break;
            case "mp4":
                contentType = "video/mp4";
                break;
        }

        try {
            ObjectMetadata metadata = new ObjectMetadata();

            metadata.setContentType(contentType);
            metadata.setContentLength(file.getSize());

            // bucket 버킷 이름, fileName 파일 이름, multipartFile.getInputStream() - multipartFile을 InputStream 형태로 변환
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), metadata)
                    // withCannedAcl 이 접근할 수 있도록 권한 부여.
                    .withCannedAcl(CannedAccessControlList.PublicRead));

        } catch (AmazonServiceException e) {
            log.warn(e.getMessage());
        } catch (SdkClientException e) {
            log.warn(e.getMessage());
        }

        return amazonS3.getUrl(bucket, fileName).toString();
    }

    public void deleteFile(ImageUrl imageUrl) {
        try {
            String imageUrlName;

            imageUrlName = imageUrl.getUrl().substring(imageUrl.getUrl().lastIndexOf("/") + 1);

            // S3에서 파일을 삭제합니다.
            amazonS3.deleteObject(bucket, imageUrlName);
            log.info("Successfully deleted file from S3: {}", imageUrlName);
        } catch (AmazonServiceException e) {
            log.error("Error occurred while deleting file from S3", e);
        } catch (SdkClientException e) {
            log.error("Client error occurred while deleting file from S3", e);
        }
    }

    private String generateUniqueFileName(String originalFileName) {
        UUID uuid = UUID.randomUUID();

        String extension = "";
        int dotIdx = originalFileName.lastIndexOf(".");

        if (dotIdx >= 0) {
            extension = originalFileName.substring(dotIdx);
        }

        return uuid.toString() + extension;
    }
}
