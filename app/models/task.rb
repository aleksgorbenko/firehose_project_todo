class Task < ActiveRecord::Base
   validates :title, presence: true, uniqueness: true, length: {within: 3..50 }

end
