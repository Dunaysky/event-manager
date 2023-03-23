class ChangeCreatorToEventUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_default :event_users, :creator, false
  end
end
