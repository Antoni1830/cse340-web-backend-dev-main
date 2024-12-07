-- insert new record
INSERT INTO account 
( account_firstname , account_lastname , account_email , account_password)
VALUES
( 'Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- modify Tony Stark record
UPDATE account
SET
account_type = 'Admin'

-- delete the Tony Stark record
DELETE 
FROM
account
WHERE
account_firstname = 'Tony'

-- modify hummer description 
UPDATE inventory
SET inv_description = REPLACE( inv_description, 'small interiors','a huge interior');

-- inner join 
SELECT
inv_make,
inv_model,
classification_name
FROM
inventory
INNER JOIN 
classification
ON 
inventory.classification_id = classification.classification_id
WHERE classification_name = 'Sport';

-- updating records
UPDATE inventory
SET 
inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');