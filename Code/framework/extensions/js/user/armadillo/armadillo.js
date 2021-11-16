/*
	Armadillo (JSON DB over the browser)

	File: armadillo.js (Version: 1.0)
	Description: This file contains the Armadillo extension.
	Dependencies: Vulcan, Pythia and Sensei.

	Coded by George Delaportas (G0D)
    Copyright (C) 2017
    Open Software License (OSL 3.0)
*/

// Armadillo
function armadillo()
{
	// Data repository model
	function data_repo_model()
	{
		this.db_container = []; 		// DB container
		this.selected_db = null; 		// Selected DB
		this.selected_record = null;	// Selected record
	}

	// Helpers model
	function helpers_model()
	{
		// Init storage (if it has previously saved data)
		this.init_storage = function()
		{
			var __container = localStorage.getItem('armadillo');

			if (!__container)
				localStorage.setItem('armadillo', JSON.stringify([]));

			// Populate DB container
			data_repo.db_container = JSON.parse(__container);

			if (self.log_enabled)
				sensei('Armadillo', 'Storage has been initialized!');

			return null;
		};

		// Empty storage
		this.empty_storage = function()
		{
			data_repo.db_container = [];
			data_repo.selected_db = null;
			data_repo.selected_record = null;

			localStorage.clear();

			if (self.log_enabled)
				sensei('Armadillo', 'Storage is now empty!');

			return null;
		};

		// DB name exists
		this.db_name_exists = function(name, db_array)
		{
			var __this_name = null;

			for (__this_name in db_array)
			{
				if (__this_name == name)
					return true;
			}

			return false;
		};

		// Check for duplicates
		this.duplicates_exist = function(mode, attribute)
		{
			if (mode === 'db')
			{
				if (helpers.db_name_exists(attribute, data_repo.db_container))
				{
					if (self.log_enabled)
						sensei('Armadillo', 'A DB with the same name exists!');

					return true;
				}
			}
			else if (mode === 'record')
			{
				return helpers.super_iterator([attribute], function()
					   {
							if (self.log_enabled)
								sensei('Armadillo', 'A record with the same ID exists!');

							return true;
					   });
			}

			return false;
		};

		// Generate record UID
		this.generate_record_uid = function()
		{
			var uid = rnd_gen.generate();

			if (helpers.duplicates_exist('record', uid))
			{
				var __index = 0,
					__this_db = data_repo.db_container[data_repo.selected_db],
					__records_length = __this_db.length;
					__existing_id_array = [];

				for (__index = 0; __index < __records_length; __index++)
					__existing_id_array.push(__this_db[__index].id);

				rnd_gen.load(__existing_id_array);

				uid = rnd_gen.generate();
			}

			return uid;
		};

		// DB exists
		this.db_exists = function(db_name)
		{
			if (!utils.validation.alpha.is_string(db_name))
				return false;

			if (helpers.db_name_exists(db_name, data_repo.db_container))
				return true;

			if (self.log_enabled)
				sensei('Armadillo', 'DB does not exist!');

			return false;
		};

		// Super iterator (Diligence function for common loops)
		this.super_iterator = function(values, exec_code)
		{
			var __index = 0,
				__this_db = data_repo.db_container[data_repo.selected_db],
				__records_length = __this_db.length;

			for (__index = 0; __index < __records_length; __index++)
			{
				if (__this_db[__index].id == values[0])
					return exec_code.call(this, [__index, __this_db, values[1]]);
			}

			return false;
		};
	}

	// DB
	function db_context()
	{
		// Set DB
		this.set = function(db_name)
		{
			if (helpers.db_exists(db_name))
				return false;

			data_repo.db_container[db_name] = [];
			data_repo.selected_db = db_name;
			data_repo.selected_record = null;

			localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));

			return true;
		};

		// Get DB
		this.get = function(db_name)
		{
			if (!utils.validation.misc.is_invalid(db_name) && !helpers.db_exists(db_name))
				return false;

			data_repo.selected_record = null;

			if (utils.validation.misc.is_invalid(db_name))
			{
				if (data_repo.selected_db === null)
					return false;

				return data_repo.db_container[data_repo.selected_db];
			}
			else
				return data_repo.db_container[db_name];
		};

		// Remove DB
		this.remove = function(db_name)
		{
			if (!helpers.db_exists(db_name))
				return false;

			var __db_name = null,
				__new_db_container = null;
			
			for (__db_name in data_repo.db_container)
			{
				if (__db_name != db_name)
					__new_db_container[__db_name] = data_repo.db_container[db_name];
			}

			data_repo.db_container = __new_db_container;
			data_repo.selected_db = null;
			data_repo.selected_record = null;

			localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));

			return true;
		};

		// Use DB
		this.use = function(db_name)
		{
			if (!helpers.db_exists(db_name))
				return false;

			data_repo.selected_db = db_name;
			data_repo.selected_record = null;

			return true;
		};
	}

	// Records
	function records_context()
	{
		// Insert record
		this.insert = function(record)
		{
			if (data_repo.selected_db === null || !utils.validation.misc.is_object(record) || record.hasOwnProperty('id'))
				return false;

			record.id = helpers.generate_record_uid();

			data_repo.db_container[data_repo.selected_db].push(record);
			data_repo.selected_record = record;

			localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));

			return true;
		};

		// Select record
		this.select = function(record_id)
		{
			if (data_repo.selected_db === null || !utils.validation.numerics.is_number(record_id))
				return false;

			return helpers.super_iterator([record_id], function(env)
				   {
						data_repo.selected_record = env[1][env[0]];

						return data_repo.selected_record;
				   });
		};

		// Fetch all records
		this.fetch = function()
		{
			if (data_repo.selected_db === null)
				return false;

			data_repo.selected_record = null;

			return data_repo.db_container[data_repo.selected_db];
		};

		// Save record
		this.save = function(record)
		{
			if (data_repo.selected_db === null || 
				!utils.validation.misc.is_object(record) || !record.hasOwnProperty('id') || 
				!helpers.duplicates_exist('record', record.id))
				return false;

			return helpers.super_iterator([record.id, record], function(env)
				   {
						env[1][env[0]] = env[2];

						data_repo.db_container[data_repo.selected_db] = env[1];
						data_repo.selected_record = env[1][env[0]];

						localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));

						return true;
				   });
		};

		// Delete record
		this.delete = function(record_id)
		{
			if (data_repo.selected_db === null || !utils.validation.numerics.is_number(record_id))
				return false;

			return helpers.super_iterator([record_id], function(env)
				   {
						env[1].splice(env[0], 1);

						data_repo.selected_record = null;

						localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));

						return true;
				   });
		};

		// Clear all records
		this.clear = function()
		{
			if (data_repo.selected_db === null)
				return false;

			data_repo.db_container[data_repo.selected_db] = [];
			data_repo.selected_record = null;

			localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));

			return true;
		};
	}

	// Reset storage
	this.reset = function()
	{
		helpers.empty_storage();

		return null;
	};

	// Initialize and check for Local Storage support (Edge & IE are buggy - Firefox, Chrome & Opera are fine)
	function init()
	{
		if (typeof(Storage) === 'undefined')
			return false;

		helpers.init_storage();

		return true;
	}

	this.db = new db_context();
	this.records = new records_context();
	this.log_enabled = false;

	var self = this,
		data_repo = new data_repo_model(),
		helpers = new helpers_model(),
		utils = new vulcan(),
		rnd_gen = new pythia();

	// Intialize
	init();
}
