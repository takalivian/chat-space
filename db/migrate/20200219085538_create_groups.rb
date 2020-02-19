class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.integer :user_id, null: false
      t.string :group_name, null: false
      t.timestamps
    end
  end
end

