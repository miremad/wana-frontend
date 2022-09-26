<template>
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-26">
						Welcome
					</span>
					<span class="login100-form-title p-b-48">
						<i class="zmdi zmdi-font"></i>
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
						<input class="input100" type="text" name="username" v-model="loginData.userName">
						<span class="focus-input100" data-placeholder="username"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<input class="input100" type="password" name="pass" v-model="loginData.password">
						<span class="focus-input100" data-placeholder="Password"></span>
					</div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<b-spinner
								v-if="isRequesting"
								variant="warning"
								type="grow"
							></b-spinner>
							<div  v-if="!isRequesting" class="login100-form-bgbtn"></div>
							
							<button  v-if="!isRequesting" class="login100-form-btn" type="submit" @click="login" :disabled="isRequesting">
								<span>Login</span>
							</button>
						</div>
					</div>

					<div class="text-center p-t-115">
						<span class="txt1">
							Don’t have an account?
						</span>

						<router-link class="txt2" to="/signup">
							Sign Up
                        </router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>


export default {

	data(){
		return{
			isRequesting: false,
			loginData: {
				userName: '',
				password: ''
			}
		}
	},
	
	methods: {
		login(e){

			e.preventDefault();
			this.isRequesting = true;
			this.axios.post('https://todoapp.linkeee.ir/api/Account/login', this.loginData).then((response) => {

				if(response.data != null && response.data.token != null)
				{
					console.log(response.data)
					localStorage.setItem("token", response.data.token);
					this.isRequesting = false
					this.$router.push('/todo')
				}
				
				
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