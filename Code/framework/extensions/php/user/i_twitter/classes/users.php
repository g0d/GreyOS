<?php

    /*

        GreyOS Inc. - Users Class of API Wrapper

        Version: 1.0

        File name: users.php
        Description: This file contains the Users Class of API Wrapper.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */



	class USERS extends API_WRAPPER
	{

      private $data;

      public function __construct()
      {

          $this->data = array();

      }

  		public function Get_Account_Settings()
  		{

    			$this->data['url'] = '1.1/account/settings.json';
          $this->data['method'] = 'GET';
    			$this->data['parameters'] = array();

    			return $this->data;

  		}

  		public function Account_Verify_Credentials()
  		{

    			$this->data['url'] = '1.1/account/verify_credentials.json';
    			$this->data['method'] = 'GET';
          $this->data['parameters'] = array();

          return $this->data;

  		}

  		public function Post_Account_Settings($parameters)
  		{

    			$this->data['url']= '1.1/account/settings.json';
          $this->data['method'] = 'POST';
    			$this->data['parameters'] = $parameters;

    			return $this->data;

  		}

  		public function Account_Update_Delivery_Device()
  		{

          $this->data['url']= '1.1/account/update_delivery_device.json';
          $this->data['method'] = 'POST';
          $this->data['parameters'] = $parameters;

          return $this->data;

  		}

    	public function Account_Update_Profile($parameters)
    	{

          $this->data['url']= '1.1/account/update_profile.json';
          $this->data['method'] = 'POST';
          $this->data['parameters'] = $parameters;

          return $this->data;

    	}

  		public function Account_Update_Profile_Background_Image($parameters)
  		{

          $this->data['url']= '1.1/account/update_profile_background_image.json';
          $this->data['method'] = 'POST';
          $this->data['parameters'] = $parameters;

          return $this->data;

  		}

  		public function Account_Update_Profile_Colors($parameters)
  		{

          $this->data['url']= '1.1/account/update_profile_colors.json';
          $this->data['method'] = 'POST';
          $this->data['parameters'] = $parameters;

          return $this->data;

      }

    	public function Account_Update_Profile_Image($parameters)
    	{

          $this->data['url']= '1.1/account/update_profile_image.json';
          $this->data['method'] = 'POST';
          $this->data['parameters'] = $parameters;

          return $this->data;

    	}

  		public function Blocks_List()
  		{

          $this->data['url']= '1.1/blocks/list.json';
          $this->data['method'] = 'GET';
          $this->data['parameters'] = array();

          return $this->data;

  		}

  		public function Blocks_Ids()
  		{
          
  		}

  		public function Blocks_Create()
  		{

  		}

  		public function Blocks_Destroy()
  		{

  		}

  		public function Users_Lookup()
  		{

  		}

  		public function Users_Show($parameters)
  		{

          $this->data['url'] = '1.1/users/show.json';
          $this->data['method'] = 'GET';
          $this->data['parameters'] = $parameters;

          return $this->data;

  		}

  		public function Users_Search()
  		{

  		}

  		public function Users_Contributees()
  		{

  		}

  		public function Users_Contributors()
  		{
  	
  		}

  		public function Account_Remove_Profile_Banner()
  		{
  	
  		}

  		public function Account_Update_Profile_Banner()
  		{

  		}

  		public function Users_Profile_Banner()
  		{

  		}

	}

?>