package com.b107.interview.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeConverter {

    public static String toString(LocalDateTime dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-ddHH-mm-ss");
        return formatter.format(dateTime);
    }
}
