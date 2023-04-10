<?php
/**
 * @api {post} /eKuponAPI/cardDecryptor.php Retrieve card info through decryption
 * @apiName cardDecryptor
 * @apiGroup Card
 * 
 * @apiDescription Retrieve card info through decryption
 * 
 * @apiHeader {String} token User's token
 * @apiParam {String} data Card cipher text base64 format
 * @apiParam {String} [totalPrice] Total price if requested
 * @apiParam {String} authKey Application authentication key
 *
 * @apiSuccess {String} eKuponId eKupon Id
 * @apiSuccess {String} cardHolderName Cardholder name
 * @apiSuccess {String} photo Cardholder photo
 * @apiSuccess {String} balanceRinggit Card balance in Ringgit
 * @apiSuccess {String} balanceSen Card balance in Sen
 * @apiSuccess {Number} Id card Id
 * @apiSuccess {String} cardName Cardholder name
 * @apiSuccess {String} personalID Cardholder personal Id (MyKid, MyKad)
 * @apiSuccess {String} cardStatus Card status (active, blocked, unverified, pending failed, pending payment)
 * @apiSuccess {String} className  Classroom name
 * @apiSuccess {Number} dailyLimitInSen Card daily limit in Sen
 * @apiSuccess {String} cardId  Card Hex Id
 * @apiSuccess {String} premiseName  Succeeded Activity.
 * @apiSuccess {Number} premiseId Premise Id
 * @apiSuccess {String} serialNumber Card serial number
 * @apiSuccess {Number} minBalanceInSen Card minimum balance in Sen
 * @apiSuccess {String} hasPending Pending balance status
 * @apiSuccess {String} purchasedTodayInSen Total purchase today in Sen
 * @apiSuccess {String} purchasedTodayInSenBookshop Total purchase today at bookshop in Sen
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "eKuponId": "EKS369",
 *    "cardHolderName": "[VNET] Shalin Zulkifli",
 *    "photo": "EKS369_photo.jpg",
 *    "balanceRinggit": "69",
 *    "balanceSen": "0",
 *    "Id": 369,
 *    "cardName": "[VNET] Shalin Zulkifli",
 *    "personalID": "Vn121212",
 *    "cardStatus": "active",
 *    "className": "1 UITM",
 *    "dailyLimitInSen": 500,
 *    "cardId": "VN198291281",
 *    "premiseName": "SEKOLAH KEBANGSAAN TAMAN UNIVERSITI",
 *    "premiseId": 2,
 *    "serialNumber": "VN109210291",
 *    "minBalanceInSen": 500,
 *    "hasPending": "0",
 *    "purchasedTodayInSen": "100",
 *    "purchasedTodayInSenBookshop": "0"
 *}
 * 
 * @apiError {String} 400-A 1 or more parameters is empty
 * @apiError {String} 400-B temporary card not valid
 * @apiError {String} 400-C card not found
 * 
 * @apiErrorExample {json} 400-A Error-Response:
 *     {
 *       "result": "failed",
 *       "reason": "1 or more parameters is empty"
 *     }
 * 
 * @apiErrorExample {json} 400-B Error-Response:
 *     {
 *       "result": "failed",
 *       "reason": "temporary card not valid"
 *     }
 * 
 * @apiErrorExample {json} 400-C Error-Response:
 *     {
 *       "result": "failed",
 *       "reason": "card not found"
 *     }
 * 
 * 
 * 
 * 
 */
    require('header.php');
	//Receive the RAW post data.
	$jsondata = '';
	$jsondata = trim(file_get_contents("php://input"));
	
	$obj = json_decode($jsondata, true);

	date_default_timezone_set('Asia/Kuala_Lumpur');
	class response {
		public $result = "";
		public $reason = "";
		public $data = "";
	}

	class cardDetails {
		public $eKuponId = "";
		public $cardHolderName = "";
		public $photo = "";
		public $balanceRinggit = "";
		public $balanceSen = "";
	}

	require('cdb.php');

	$ciphertext_b64 = $obj['data'];

	$password = "cee493bed7abce66e11d397338ef46f1";
    $salt = "hY0wTq6xwc6ni01G";
    $iv = "433d5a0dfb31845f";
    $iterations = 1001;
    $keyLength = 256;

    $prepared_key = openssl_pbkdf2($password, $salt, $keyLength, $iterations, "sha1");
	
    $decrypted_message = openssl_decrypt(base64_decode($ciphertext_b64),"AES-256-CBC", $prepared_key,OPENSSL_RAW_DATA, $iv);

    $decrypted_message = json_encode($decrypted_message);
	$output= stripslashes($decrypted_message);   

	if(strpos($output,'"')===0)$output=substr($output,1,(strlen($output)-1));
	// if the last char is a " then remove it
	if(strripos($output,'"')===(strlen($output)-1))$output=substr($output,0,-1);

	// echo $output;
	$decode = json_decode($output);

	$ekuponId = $decode->ekuponId;
	$did = $decode->dId;
	$cardId = preg_replace("/[^0-9]/", "", $ekuponId );

	//get userId
	$objJWT = new ImplementJWT();
			
	if($objJWT->DecodeToken($objJWT->getBearerToken()) != null)
	{
		$array = $objJWT->DecodeToken($objJWT->getBearerToken());
	
		$userId = json_encode($array['userId'],true);
	}

	//check if card is temp.card
	if($did != null)
	{
		$sql = "SELECT originalCardId FROM cardTemporaryReplacement WHERE tempCardId = '".$did."' AND (NOW() BETWEEN startDateTime AND endDateTime) ORDER BY Id DESC LIMIT 1 ";

		if($result = mysqli_query($conn,$sql)){

			$rowcount = mysqli_num_rows($result);

			if($rowcount > 0)
			{
				while ($row = mysqli_fetch_assoc($result)) {
					$cardId = $row['originalCardId'];

					$ekuponId = "EKS".$cardId;
				}
			}else{
				http_response_code(400);
				$r = new response();
				$r->result = "failed";
				$r->reason = "temporary card not valid";
				echo json_encode($r);
				exit();		
			}
		}

		$isTemp = "1";
	}else{
		$isTemp = "0";
	}

	$sql = "SELECT ch.minBalanceInSen, ch.personalID, ch.cardStatus, ch.Id AS idCard,ch.cardHolderName, ch.displayName,ch.balanceRinggit, ch.balanceSen, ch.photo, ch.className, ch.serialNumber, ";
	$sql.= "ch.cardId,ch.dailyLimitInSen,p.Id,p.locationName FROM cardHolder AS ch INNER JOIN premises AS p ";
	$sql.= "ON p.Id IN (SELECT premisesId FROM cardholderlocation WHERE cardHolderId= '".$cardId."') AND ";
	$sql.= "ch.Id = '".mysqli_real_escape_string($conn,$cardId)."'";

	// echo $sql;
	if($result = mysqli_query($conn,$sql)){

		$rowcount = mysqli_num_rows($result);
		if($rowcount > 0)
		{
			while ($row = mysqli_fetch_assoc($result)) {

				$cardHolderName = $row['displayName'] ?? $row['cardHolderName'];

				$e = new cardDetails();
				$e->Id = (int)$row['idCard'];
				$e->eKuponId = $ekuponId;
				$e->cardHolderName = $row['displayName'] ?? $row['cardHolderName'];
				$e->cardName = $row['cardHolderName'];
				$e->balanceRinggit = $row['balanceRinggit'];

				$balanceRinggit2 = $row['balanceRinggit'];
				
				$e->personalID = $row['personalID'];
				switch($row['cardStatus']){

					case -4: $e->cardStatus = "shipped";
					break;
					
					case -3: $e->cardStatus = "pending payment";
					break;
					
					case -2: $e->cardStatus = "pending failed";
					break;
					
					case -1: $e->cardStatus = "unverified";
					break;
					
					case 0: $e->cardStatus = "blocked";
					break;
					
					case 1: $e->cardStatus = "active";
					break;
				}
				
				$balanceRinggit = $row['balanceRinggit'];
				$e->balanceSen = $row['balanceSen'];

				$balanceSen2 = $row['balanceSen'];

				$dailyLimitInSen = (int)$row['dailyLimitInSen'];
				$e->className = $row['className'];
				$e->dailyLimitInSen = (int)$row['dailyLimitInSen'];
				$e->cardId = $row['cardId'];
				$e->photo = $row['photo'];
				$e->premiseName = $row['locationName'];
				$e->premiseId = (int)$row['Id'];
				$e->serialNumber = $row['serialNumber'];
				$e->minBalanceInSen = (int)$row['minBalanceInSen'];

				$id = $row['idCard'];
				//------------------------------

				//sync purchase offline
				//check If ada balance to sync
				//get current unsync balance
				$sql = "SELECT * FROM offlinePurchase WHERE cardId = ".$cardId." AND totalAmountInSen > 0 ";

				$result = mysqli_query($conn,$sql);
				$rowcount = mysqli_num_rows($result);
				//echo $rowcount;
				if($rowcount > 0)
				{
					$currentUnSyncAmount = 0;
					while ($row = mysqli_fetch_assoc($result)) {
						$currentUnSyncAmount = $row['totalAmountInSen'];
						
						if($currentUnSyncAmount > 0)
						{
							//get card currentbalance
							$currentBalanceInSen = 0;
							$sql2 = "SELECT * FROM cardHolder WHERE Id = ".$cardId."";
							$result2 = mysqli_query($conn,$sql2);
							while ($row2 = mysqli_fetch_assoc($result2)) {
								$currentBalanceInSen = (intval($row2['balanceRinggit'])*100) + intval($row2['balanceSen']);
								
								//update new balance from offline purchase
								$newBalanceInSen = $currentBalanceInSen - $currentUnSyncAmount;
								$unSyncBalance = 0;
								$amountToSync = $newBalanceInSen;
								//if negative, sync later
								if($newBalanceInSen < 0)
								{
									$unSyncBalance = $newBalanceInSen * -1;
									$amountToSync = $currentBalanceInSen; //sync only available amount
									$newBalanceInSen = 0;
								}

								mysqli_autocommit($conn,FALSE);

								//update pending balance to sync
								$sql3 = "UPDATE offlinePurchase SET totalAmountInSen = ".$unSyncBalance." WHERE cardId = ".$cardId."";

								if ($conn->query($sql3) === TRUE) {

									$newBalRinggit = intval($newBalanceInSen/100);
									// $newBalSen = intval($newBalanceInSen % 100);

									$newBalSen = substr( $newBalanceInSen, -2);
									
									$sql4 = "UPDATE cardHolder SET balanceRinggit = ".$newBalRinggit.", balanceSen = ".$newBalSen." WHERE Id = ".$cardId."";
									// echo $sql4;
									if ($conn->query($sql4) === TRUE) {

										mysqli_commit($conn);

										$e->offlinePurchaseSync = "updated";
										
										$balanceRinggit = $newBalRinggit;
										$e->balanceRinggit = strval($newBalRinggit);

										$balanceRinggit2 = strval($newBalRinggit);

										$e->balanceSen = strval($newBalSen);

										$balanceSen2 = strval($newBalSen);
									} else {
										$e->offlinePurchaseSync = "failed";
									}
								} else {
									$e->offlinePurchaseSync = "failed";
								}
							
							}
						}
						
					}
				}
				// purchase offline end-------------------------------
				//topUp sync
				$sqlSYNC = "SELECT topUpSync.*, user.name AS topUpByName FROM topUpSync INNER JOIN user ";
				$sqlSYNC.= "ON topUpSync.topUpBy = user.Id WHERE cardId = ".$id." AND syncStatus = 0 ";
			
				$resultSYNC = mysqli_query($conn,$sqlSYNC);
				$rowcountSYNC = mysqli_num_rows($resultSYNC);
					//echo $rowcount;
					if($rowcountSYNC > 0){
						$e->hasPending = "1";
						$idArray = array();

						$syncIds = array();
						while ($rowSYNC = mysqli_fetch_assoc($resultSYNC)) {

							array_push($syncIds,$rowSYNC['Id']);
							array_push($idArray,'{id:'.$rowSYNC['Id'].'}');
							$total += (int)$rowSYNC['amountRinggit'];

							$rowSYNC['topUpBy'];
						}
						// print_r($idArray);
						//
						// mysqli_autocommit($conn,FALSE);
						//insert into TopUpLog
						$sqlTopUpLog = "INSERT INTO topUpLog (ammount, cardId, topUpBy)";
						$sqlTopUpLog .= " VALUES (".$total.", ".$id.", ".$userId.")";

						if ($conn->query($sqlTopUpLog) === TRUE) {
							mysqli_autocommit($conn,FALSE);
							//updateIf ada TopUpSync
							//syncIdArray : [{id:1},{id:2},{id:3},...]
							if(isset($idArray)){

								foreach($syncIds as $syncId){

									$sqlTopUpSync = "UPDATE topUpSync SET syncStatus = 1 WHERE Id = ".$syncId." ";

									if ($conn->query($sqlTopUpSync) === TRUE) {

										mysqli_commit($conn);

										$e->topUpSync = "updated";
									
									}else{
										$e->topUpSync = "failed";
									}

								}

								$sqlUpdateCard = "UPDATE cardHolder SET balanceRinggit = balanceRinggit + ".$total." WHERE Id = ".$id."  ";

								if ($conn->query($sqlUpdateCard) === TRUE) {

									mysqli_commit($conn);
									$e->balanceSync = "updated";
									$e->balanceRinggit = strval((int)$balanceRinggit + (int)$total);

									$balanceRinggit2 = strval((int)$balanceRinggit + (int)$total);

								}else{
									$e->balanceSync = "failed";
								}

							}else{
								mysqli_commit($conn);
							}
						}else{
							$e->topUpSync = "failed";
						}
						// $e->idArray = $idArray;
						// $e->pendingRinggit = $total;
					}
					else{
						$e->hasPending = "0";
					}
					
				//------------------------------

				//get today's purchase

				// posPurchaseLog
				// $sqlToday = "SELECT SUM(priceInSen) AS totalInSen FROM posPurchaseLog WHERE cardId = ".$id." AND DATE(paidDate) = DATE(NOW())";

				// echo $sqlToday;
				$sqlToday = "SELECT SUM((totalPurchaseRinggit*100) + totalPurchaseSen) AS totalInSen FROM purchase WHERE cardHolderId = ".$id." AND DATE(purchaseDate) = DATE(NOW())";
				$resultToday = mysqli_query($conn, $sqlToday);	
				
				while ($rowToday = mysqli_fetch_assoc($resultToday)) {
					
					if($rowToday['totalInSen'] == null){
						$e->purchasedTodayInSen = "0";

                        if (isset($obj['totalPrice'])) {
                            $getTotalPrice = preg_replace('/[^0-9]/', '', $obj['totalPrice']);
							$e->purchasedTodayInSen = (string)$getTotalPrice;
                            // $newPurchasedTodayInSen = $purchasedTodayInSen + (int)$getTotalPrice;
							$purchasedTodayInSen = (int)$getTotalPrice;
                        }else{
							$purchasedTodayInSen = 0;
						}



						// $purchasedTodayInSen = 0;
					}
					else{
						if (isset($obj['totalPrice'])) {
                            $getTotalPrice = preg_replace('/[^0-9]/', '', $obj['totalPrice']);
							$purchasedTodayInSenss = $rowToday['totalInSen'] + (int)$getTotalPrice;

							$e->purchasedTodayInSen = (string)$purchasedTodayInSenss;
                            // $newPurchasedTodayInSen = $purchasedTodayInSen + (int)$getTotalPrice;
							$purchasedTodayInSen = (int)$getTotalPrice;
                        }else{
							$e->purchasedTodayInSen = (string)$rowToday['totalInSen'];
							$purchasedTodayInSen = $rowToday['totalInSen'];
						}
					}
				}
				
				// posPurchaseLog
				$sqlToday = "SELECT SUM(priceInSen) AS totalInSen FROM posPurchaseLog WHERE cardId = ".$id." AND DATE(paidDate) = DATE(NOW())";
				$resultToday = mysqli_query($conn, $sqlToday);	
				
				while ($rowToday = mysqli_fetch_assoc($resultToday)) {
					
					if($rowToday['totalInSen'] == null){
						$e->purchasedTodayInSenBookshop = "0";
					}
					else{
						$e->purchasedTodayInSenBookshop = (string)$rowToday['totalInSen'];
					}
				}

				if (isset($obj['totalPrice'])) { // if API called from purchase

					$refNo = $obj['notificationId'].'_'.$id;
					
					// $sql = "select"
					$getTotalPrice = preg_replace('/[^0-9]/', '', $obj['totalPrice']);

					$getTotalPriceRM = 'RM '. number_format(($getTotalPrice /100), 2, '.', ' ') ?: 'RM 0.00';

					$newPurchasedTodayInSen = $purchasedTodayInSen + (int)$getTotalPrice;

					//
					$totalCardBalance = (($balanceRinggit2 * 100) + $balanceSen2);

					// $totalPriceRaw = preg_replace('/[^0-9]/', '', $obj['totalPrice']);

					if($getTotalPrice > $totalCardBalance)
					{

						$parentIdArray = array();
						$sql = "SELECT parentId FROM tagCard WHERE cardId = ".$id."";
						$result = mysqli_query($conn,$sql);
						while ($row = mysqli_fetch_assoc($result)) {
							$parentIdArray[] = $row['parentId'];
						}	

						$date = date("h:i");

						$message = '\"'.$cardHolderName.'\" failed to make purchase with a total amount of \"'.$getTotalPriceRM.'\" today at \"'.$date.'\"';


						for ($i = 0; $i<count($parentIdArray); $i++) {
							//insert into notification
							$sqlNotification = "INSERT INTO notification (message,link,receiverId,notificationActivityId,notificationDetails,notificationRef) ";
							$sqlNotification.= "VALUES ('".$message."', ";
							$sqlNotification.= "'".$id."',".$parentIdArray[$i].", 4, '".$amount."','".$refNo."' )";
			
							if ($conn->query($sqlNotification) === true) {
		
								$notificationId = $conn->insert_id;
							}
						}
					}

					//
					if($newPurchasedTodayInSen > $dailyLimitInSen)
					{

						$parentIdArray = array();
						$sql = "SELECT parentId FROM tagCard WHERE cardId = ".$id."";
						$result = mysqli_query($conn,$sql);
						while ($row = mysqli_fetch_assoc($result)) {
							$parentIdArray[] = $row['parentId'];
						}	

						$date = date("h:i");

						$message = '\"'.$cardHolderName.'\" failed to make purchase with a total amount of \"'.$getTotalPriceRM.'\" today at \"'.$date.'\" due to the card daily purchase limit had been reached.';

						for ($i = 0; $i<count($parentIdArray); $i++) {
							//insert into notification
							$sqlNotification = "INSERT INTO notification (message,link,receiverId,notificationActivityId,notificationDetails,notificationRef) ";
							$sqlNotification.= "VALUES ('".$message."', ";
							$sqlNotification.= "'".$id."',".$parentIdArray[$i].", 3, '".$amount."','".$refNo."' )";
			
							if ($conn->query($sqlNotification) === true) {
		
								$notificationId = $conn->insert_id;
							}
						}
					}
					$e->notificationId = $notificationId;
                }
				$e->isTemp = $isTemp;
				//------------------------------


				// if($balanceRinggit == NULL){
				// 	$e->balanceRinggit = "0";
				// }else{
				// 	$e->balanceRinggit = $balanceRinggit;
				// }

				// if($balanceSen == NULL){
				// 	$e->balanceSen = "0";
				// }else{
				// 	$e->balanceSen = $balanceSen;
				// }
				echo json_encode($e);
			}
		}else{
			http_response_code(400);
			$r = new response();
			$r->result = "failed";
			$r->reason = "card not found";
			echo json_encode($r);
			exit();
		}
	}else{
		http_response_code(400);
		$r = new response();
		$r->result = "failed";
		$r->reason = $conn->error;
		echo json_encode($r);
		exit();
	}

?>