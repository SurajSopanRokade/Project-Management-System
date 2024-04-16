package com.Techprimelab.Project.IServices;

import java.util.List;

import com.Techprimelab.Project.Models.Reason;
import com.Techprimelab.Project.Models.User;

public interface IReasonService {

	List<Reason> getAllReasons();
	Reason saveReason(Reason r);
	Reason updateReason(Reason r);
	void deleteReason(int id);
	Reason searchReasonById(int id);
}
