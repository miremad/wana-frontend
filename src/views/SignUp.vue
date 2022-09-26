<template>
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-26">
						Sign Up
					</span>
					<span class="login100-form-title p-b-48">
						<i class="zmdi zmdi-font"></i>
					</span>

                    <div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
						<input class="input100" type="text" name="username" v-model="signupData.userName">
						<span class="focus-input100" data-placeholder="username"></span>
					</div>

                    <div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
						<input class="input100" type="text" name="firstname" v-model="signupData.firstName">
						<span class="focus-input100" data-placeholder="first name"></span>
					</div>

                    <div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
						<input class="input100" type="text" name="lastname" v-model="signupData.lastName">
						<span class="focus-input100" data-placeholder="last name"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
						<input class="input100" type="text" name="email" v-model="signupData.email">
						<span class="focus-input100" data-placeholder="Email"></span>
					</div>


					<div class="wrap-input100 validate-input" data-validate = "Valid phoneNumber is: a@b.c">
						<input class="input100" type="text" name="phoneNumber" v-model="signupData.phoneNumber">
						<span class="focus-input100" data-placeholder="phoneNumber"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<input class="input100" type="password" name="pass" v-model="signupData.password">
						<span class="focus-input100" data-placeholder="Password"></span>
					</div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<b-spinner
								v-if="isRequesting"
								variant="warning"
								type="grow"
							></b-spinner>
							<div v-if="!isRequesting" class="login100-form-bgbtn"></div>
							
							<button v-if="!isRequesting" class="login100-form-btn" type="submit" @click="signup" :disabled="isRequesting">
								<span>Signup</span>
							</button>
						</div>
					</div>

					<div class="text-center p-t-115">
						<span class="txt1">
							Do you have an account?
						</span>

						<router-link  class="txt2" to="/login">
							login
						</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>


export default {
	
	data() {
		return{
			signupData: {},
			isRequesting: false
		}
	},
	methods: {
		signup(e){

			e.preventDefault();
			this.isRequesting = true;
			this.axios.post('https://todoapp.linkeee.ir/api/Account/createUser', this.signupData).then((response) => {

				console.log(response.data.succeeded)

				if(response.data.succeeded == true)
				{
					this.isRequesting = false
					this.$router.push('/login')
					
				}
				
				this.isRequesting = false
			}).catch(e => {})
			.finally(er => {
				this.isRequesting = false
			})

		}
	}
}


</script>

<style>
    @import './../assets/css/main.css';
    @import './../assets/css/util.css';
</style>