package com.b107.interview.commons.notification;

import com.b107.interview.commons.notification.MatterMostMessageDto.Attachment;
import com.b107.interview.commons.notification.MatterMostMessageDto.Attachments;
import com.google.gson.Gson;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Getter
@Component
@RequiredArgsConstructor
public class MatterMostSender {

    @Value("${notification.mattermost.enabled}")
    private boolean mmEnabled;
    @Value("${notification.mattermost.webhook-url}")
    private String webhookUrl;

    private final RestTemplate restTemplate;
    private final MattermostProperties mmProperties;

    public void sendMessage(Exception excpetion, String uri, String params) {
        if (!mmEnabled)
            return;

        try {
            log.info("sedMessage method");
            Attachment attachment = Attachment.builder()
                    .userName(mmProperties.getUserName())
                    .iconUrl(mmProperties.getAuthorIcon())
                    .channel(mmProperties.getChannel())
                    .authorIcon(mmProperties.getAuthorIcon())
                    .authorName(mmProperties.getAuthorName())
                    .color(mmProperties.getColor())
                    .pretext(mmProperties.getPretext())
                    .title(mmProperties.getTitle())
                    .text(mmProperties.getText())
                    .footer(mmProperties.getFooter())
                    .build();

            attachment.addExceptionInfo(excpetion, uri, params);
            Attachments attachments = new Attachments(attachment);
            attachments.addProps(excpetion);
            String payload = new Gson().toJson(attachments);
            log.info("payload = " + payload);
            org.springframework.http.HttpHeaders headers = new HttpHeaders();
            headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

            HttpEntity<String> entity = new HttpEntity<>(payload, headers);
            restTemplate.postForEntity(webhookUrl, entity, String.class);

        } catch (Exception e) {
            log.error("#### ERROR!! Notification Manager : {}", e.getMessage());
        }
    }
}
