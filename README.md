## userテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|user_name|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :users_groups


## groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_name|string|null: false|

### Association
- belong_to :user
- belong_to :group


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messageテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false|
|user_id|integer|null: false|
|body|text||
|image|string||

### Association
- has_many :messages
- has_many :users, through: :users_groups