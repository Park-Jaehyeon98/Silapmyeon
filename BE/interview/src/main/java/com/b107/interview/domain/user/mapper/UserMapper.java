package com.b107.interview.domain.user.mapper;

import com.b107.interview.commons.security.config.OAuth2Attribute;
import com.b107.interview.domain.user.dto.response.UserResDto;
import com.b107.interview.domain.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User oAuth2AttributeToUser(OAuth2Attribute oAuth2Attribute);

    UserResDto userToUserResDto(User foundUser);
}
