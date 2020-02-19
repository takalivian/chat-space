class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.integer :group_id, null: false
      t.integer :user_id, null: false
      t.text :body, null: false
      t.string :image, null: false
      t.timestamps
    end
  end
end

