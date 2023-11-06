package com.b107.interview.domain.comment.mapper;

import com.b107.interview.domain.comment.dto.CommentRequest;
import com.b107.interview.domain.comment.entity.Comment;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-11-06T10:41:18+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.0.jar, environment: Java 11.0.15 (ojdkbuild)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment commnetRequestToComment(CommentRequest commentRequest) {
        if ( commentRequest == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setCommentContent( commentRequest.getContent() );

        return comment;
    }
}
