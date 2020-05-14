package com.rental.user.content;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserContentRepository extends CrudRepository<UserContent, UserContentId>{

	@Query(nativeQuery=true, value="select * from user_content where user_id= ?1")
	public ArrayList<UserContent> getUserContentForUser(@Param("emp_id") int user_id);

}
