package com.rental.user.content;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserContentRepository extends CrudRepository<UserContent, UserContentId>{

}
