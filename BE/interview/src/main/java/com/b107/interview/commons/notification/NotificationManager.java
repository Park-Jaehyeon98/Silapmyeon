package com.b107.interview.commons.notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationManager {

    private final MatterMostSender matterMostSender;

    public void sendNotification(Exception e, String uri, String params) {
        log.info("#### SEND Notification");
        matterMostSender.sendMessage(e, uri, params);
    }
}
