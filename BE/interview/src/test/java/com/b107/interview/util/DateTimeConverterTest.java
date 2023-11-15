package com.b107.interview.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.*;

class DateTimeConverterTest {

    @Test
    @DisplayName("LocalDateTime을 yyyy-MM-dd-HH-mm-ss 포맷을 가진 문자열로 변환한다.")
    void translateLocalDateTimeToString() {
        // given
        LocalDateTime dateTime = LocalDateTime.of(2023, 11, 1, 0,0, 0);

        // when
        String result = DateTimeConverter.toString(dateTime);

        // then
        assertThat(result).isEqualTo("2023-11-01-00-00-00");
    }

}