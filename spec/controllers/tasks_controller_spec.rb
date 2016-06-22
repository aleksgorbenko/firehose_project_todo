require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "task#index" do
    it "should list the tasks in the database" do
      task1 = FactoryGirl.create(:task)
      task2 = FactoryGirl.create(:task)
      get :index
      expect(response).to have_http_status :success

      response_value = ActiveSupport::JSON.decode(@response.body)
      expect(response_value.count).to eq 2
    end
  end
end
