class CreateStreams < ActiveRecord::Migration
  def change
    create_table :streams do |t|
      t.string :query
      t.string :url

      t.timestamps
    end
  end
end
