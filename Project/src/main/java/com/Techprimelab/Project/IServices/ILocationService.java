package com.Techprimelab.Project.IServices;

import java.util.List;


import com.Techprimelab.Project.Models.Location;

public interface ILocationService {

	
	List<Location> getAllLocations();
	Location saveLocation(Location l);
	Location updateLocation(Location l);
	void deleteLocation(int id);
	Location searchLocationById(int id);
}
