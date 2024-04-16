package com.Techprimelab.Project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Techprimelab.Project.IServices.ILocationService;
import com.Techprimelab.Project.Models.Division;
import com.Techprimelab.Project.Models.Location;
import com.Techprimelab.Project.repositories.LocationRepo;





@Service
public class LocationService implements ILocationService {

	@Autowired
	private LocationRepo locationRepo;

	@Override
	public List<Location> getAllLocations() {
		List<Location> locList = locationRepo.findAll();
		return locList;
	}

	@Override
	public Location saveLocation(Location l) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Location updateLocation(Location l) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteLocation(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Location searchLocationById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
}
