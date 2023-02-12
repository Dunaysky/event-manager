class CreateEventUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :event_users do |t|
      t.integer :event_id
      t.integer :user_id
      t.boolean :creator

      t.timestamps
    end
    add_index :event_users, :event_id
    add_index :event_users, :user_id
  end
end
