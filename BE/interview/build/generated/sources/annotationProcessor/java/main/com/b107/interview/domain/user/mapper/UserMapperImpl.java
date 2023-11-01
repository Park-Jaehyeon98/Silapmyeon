package com.b107.interview.domain.user.mapper;

import com.b107.interview.commons.security.config.OAuth2Attribute;
import com.b107.interview.domain.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-11-01T14:27:43+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.1.jar, environment: Java 11.0.0.1 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User oAuth2AttributeToUser(OAuth2Attribute oAuth2Attribute) {
        if ( oAuth2Attribute == null ) {
            return null;
        }

        User user = new User();

        user.setUserEmail( oAuth2Attribute.getUserEmail() );
        user.setUserNickname( oAuth2Attribute.getUserNickname() );
        user.setUserProfileUrl( oAuth2Attribute.getUserProfileUrl() );
        user.setProvider( oAuth2Attribute.getProvider() );
        user.setProviderId( oAuth2Attribute.getProviderId() );

        return user;
    }
}
